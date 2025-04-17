import json
import os
import math

class StudyPlanner:
    def __init__(self, dataset_path, user_data_path="user_data.json"):
        with open(dataset_path, 'r') as f:
            self.dataset = json.load(f)
        self.user_data_path = user_data_path
        self.users = self.load_user_data()

    def save_user_data(self):
        print(f"🔍 Saving to: {os.path.abspath(self.user_data_path)}")
        with open(self.user_data_path, 'w') as f:
            json.dump(self.users, f, indent=2)

    def load_user_data(self):
        if os.path.exists(self.user_data_path):
            with open(self.user_data_path, 'r') as f:
                return json.load(f)
        return {}
    
    def get_user_data(self, user_id):
        if user_id in self.user_data:
            return self.user_data[user_id]
        else:
            raise ValueError("User not found")

    def register_user(self, user_id, goals, goals_with_priority, days_left, hours_per_day, user_levels=None, starting_levels=None):
        self.users[user_id] = {
            "goals": goals,
            "priority": goals_with_priority,
            "level": {goal: user_levels.get(goal, "beginner") for goal in goals},
            "starting_levels": starting_levels or user_levels,  # ✅ Store separately
            "days_left": days_left,
            "hours_per_day": hours_per_day,
            "completed": {goal: [] for goal in goals},
            "progress": {goal: {} for goal in goals},
            "day": 1,
            "history": {},
            "pending_tasks": []
        }
        self.save_user_data()

    def get_user_day(self, user_id):
        return self.users[user_id]["day"]

    def is_goal_upto_intermediate(self, goal, user):
        levels = ["beginner", "intermediate"]
        completed_subtopics = [
            sub
            for topic in user["progress"][goal].values()
            for sub in topic
        ]
        for level in levels:
            for topic in self.dataset[goal].get(level, []):
                for sub in topic["subtopics"]:
                    if sub["name"] not in completed_subtopics:
                        return False
        return True

    def get_daily_plan(self, user_id):
        user = self.users[user_id]
        day_label = f"Day {user['day']}"
        total_hours = user["hours_per_day"]
        hours_remaining = total_hours
        plan = []

        # Assign pending tasks first
        still_pending = []
        for task in user.get("pending_tasks", []):
            if task["estimated_hours"] <= hours_remaining:
                plan.append(task)
                hours_remaining -= task["estimated_hours"]
            else:
                still_pending.append(task)
        user["pending_tasks"] = still_pending

        # Prioritize new tasks based on goals
        prioritized_goals = sorted(user["priority"].items(), key=lambda x: -x[1])
        total_priority = sum(user["priority"].values())

        goal_reached_mid = {
            goal: self.is_goal_upto_intermediate(goal, user)
            for goal, _ in prioritized_goals
        }

        fallback_candidates = []

        for goal, priority in prioritized_goals:
            if hours_remaining <= 0:
                break

            if goal_reached_mid[goal]:
                fallback_candidates.append(goal)
                continue

            goal_alloc_hours = (priority / total_priority) * total_hours
            goal_used_hours = sum(t["estimated_hours"] for t in plan if t["goal"] == goal)
            available_for_goal = max(goal_alloc_hours - goal_used_hours, 0)

            level = user["level"][goal]
            progress = user["progress"].setdefault(goal, {})

            # Only fetch tasks from the current level onwards
            level_order = ["beginner", "intermediate", "advanced"]
            start_index = level_order.index(level)
            for lvl in level_order[start_index:]:
                goal_data = self.dataset.get(goal, {}).get(lvl, [])

                for topic in goal_data:
                    if hours_remaining <= 0:
                        break

                    topic_name = topic["topic"]
                    topic_progress = progress.setdefault(topic_name, [])

                    for subtopic in topic["subtopics"]:
                        sub_name = subtopic["name"]
                        est_time = subtopic["estimated_time"]

                        if sub_name in topic_progress:
                            continue
                        if any(t["goal"] == goal and t["topic"] == topic_name and t["subtopic"] == sub_name for t in plan):
                            continue

                        if est_time <= hours_remaining:
                            task = {
                                "goal": goal,
                                "topic": topic_name,
                                "subtopic": sub_name,
                                "estimated_hours": est_time,
                                "documentation": subtopic["documentation"],
                                "questions": subtopic["questions"]
                            }
                            plan.append(task)
                            hours_remaining -= est_time
                            available_for_goal -= est_time

                        if hours_remaining <= 0:
                            break
                if hours_remaining <= 0:
                    break

        # Fallback: If time remains, pull 1 task from a paused goal
        if hours_remaining > 0 and fallback_candidates:
            for fallback_goal in fallback_candidates:
                level = user["level"][fallback_goal]
                level_order = ["beginner", "intermediate", "advanced"]
                for lvl in level_order[level_order.index(level):]:
                    goal_data = self.dataset.get(fallback_goal, {}).get(lvl, [])
                    progress = user["progress"].setdefault(fallback_goal, {})

                    for topic in goal_data:
                        topic_name = topic["topic"]
                        topic_progress = progress.setdefault(topic_name, [])

                        for subtopic in topic["subtopics"]:
                            sub_name = subtopic["name"]
                            est_time = subtopic["estimated_time"]

                            if sub_name in topic_progress:
                                continue
                            if any(t["goal"] == fallback_goal and t["topic"] == topic_name and t["subtopic"] == sub_name for t in plan):
                                continue

                            if est_time <= hours_remaining:
                                task = {
                                    "goal": fallback_goal,
                                    "topic": topic_name,
                                    "subtopic": sub_name,
                                    "estimated_hours": est_time,
                                    "documentation": subtopic["documentation"],
                                    "questions": subtopic["questions"]
                                }
                                plan.append(task)
                                hours_remaining -= est_time
                            break
                        if hours_remaining <= 0:
                            break
                    if hours_remaining <= 0:
                        break

        user["history"][day_label] = plan
        self.save_user_data()

        if hours_remaining > 0:
            print(f"⏳ {int(hours_remaining)} hr(s) left unassigned today due to task/time constraints.")

        return plan

    def update_progress(self, user_id, completed_indices):
        user = self.users[user_id]
        day_label = f"Day {user['day']}"
        if day_label not in user["history"]:
            return

        plan = user["history"][day_label]
        completed_indices = set(completed_indices)
        remaining_tasks = []

        for idx, task in enumerate(plan):
            goal, topic, subtopic = task["goal"], task["topic"], task["subtopic"]
            if idx in completed_indices:
                user["progress"].setdefault(goal, {}).setdefault(topic, []).append(subtopic)
            else:
                remaining_tasks.append(task)

        user["pending_tasks"].extend(remaining_tasks)
        user["day"] += 1
        self.save_user_data()

        if completed_indices:
            print("✅ Progress updated! Completed tasks recorded.")
        else:
            print("⚠️ No tasks were marked as completed. All tasks carried forward.")

    def promote_if_ready(self, user_id):
        user = self.users[user_id]
        for goal in user["goals"]:
            current_level = user["level"][goal]
            if current_level == "advanced":
                continue

            levels = ["beginner", "intermediate", "advanced"]
            current_index = levels.index(current_level)

            required_subtopics = [
                sub["name"]
                for topic in self.dataset[goal][current_level]
                for sub in topic["subtopics"]
            ]
            completed_subtopics = [
                sub
                for topic in user["progress"][goal].values()
                for sub in topic
            ]

            if all(sub in completed_subtopics for sub in required_subtopics):
                user["level"][goal] = levels[current_index + 1]
                print(f"🎉 Promoted to {user['level'][goal]} in {goal}!")

        self.save_user_data()

    def get_user_data(self, user_id):
        return self.users.get(user_id)

    def evaluate_feasibility(self, user_id):
        user = self.users[user_id]
        total_hours_needed = 0

        for goal in user["goals"]:
            level = user["level"][goal]
            level_order = ["beginner", "intermediate", "advanced"]
            for lvl in level_order[level_order.index(level):]:
                for topic in self.dataset.get(goal, {}).get(lvl, []):
                    for subtopic in topic["subtopics"]:
                        total_hours_needed += subtopic["estimated_time"]

        hours_per_day = user["hours_per_day"]
        user_days = user["days_left"]
        max_available_hours = user_days * hours_per_day

        if max_available_hours == total_hours_needed:
            status = "Perfect match – your plan fits exactly in your desired days."
            recommended_days = user_days
        elif max_available_hours > total_hours_needed:
            recommended_days = math.ceil(total_hours_needed / hours_per_day)
            status = f"You can finish earlier! Estimated days: {recommended_days}"
        else:
            extra_hours_needed = total_hours_needed - max_available_hours
            extra_days_needed = math.ceil(extra_hours_needed / hours_per_day)
            recommended_days = user_days + extra_days_needed
            status = f"⏳ You need more time. Estimated days required: {recommended_days}"

        return {
            "user_input_days": user_days,
            "estimated_total_hours_needed": total_hours_needed,
            "daily_study_hours": hours_per_day,
            "max_hours_available": max_available_hours,
            "recommended_days": recommended_days,
            "status": status
        }
