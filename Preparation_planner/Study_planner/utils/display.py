def display_plan(plan):
    if not plan:
        print("✅ All tasks completed! No new tasks for today.")
        return

    print("\n📚 Today's Study Plan:\n")
    for i, task in enumerate(plan, start=1):
        print(f"📚 Task {i}")
        print(f"🎯 Goal: {task['goal']}")
        print(f"📘 Topic: {task['topic']}")
        print(f"🔹 Subtopic: {task['subtopic']}")
        print(f"⏱️ Estimated Time: {task['estimated_hours']} hr")
        print(f"📖 Docs: {task['documentation']}")
        print(f"📝 Practice: {task['questions']}\n")

def show_feasibility(planner, user_id):
    result = planner.evaluate_feasibility(user_id)
    print("\n📊 Feasibility Check:")
    print(f"- Days Available: {result['user_input_days']}")
    print(f"- Hours/Day: {result['daily_study_hours']}")
    print(f"- Max Available Hours: {result['max_hours_available']}")
    print(f"- Estimated Required Hours: {result['estimated_total_hours_needed']}")
    print(f"- Recommended Days: {result['recommended_days']}")
    print(f"- 📌 Status: {result['status']}\n")
