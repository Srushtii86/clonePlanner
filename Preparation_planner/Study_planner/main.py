from planner.scheduler import StudyPlanner
from utils.display import display_plan, show_feasibility
from user.registration import register_new_user
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import json

def main():
    dataset_path = os.path.join("data", "expanded_study_plan_dataset.json")
    planner = StudyPlanner(dataset_path)

    user_id = input("Enter your user ID: ").strip()

    if user_id not in planner.users:
        register_new_user(planner, user_id)
        show_feasibility(planner, user_id)
    else:
        print("\n📌 Welcome back!")
        if input("Do you want to check if your plan is feasible based on current settings? (y/n): ").strip().lower() == "y":
            show_feasibility(planner, user_id)

    print(f"\n📅 Generating your plan for Day {planner.get_user_day(user_id)}...")
    plan = planner.get_daily_plan(user_id)
    display_plan(plan)

    if plan:
        completed = input("✅ Enter completed task numbers separated by commas (e.g. 1,3 or 0 if none): ").strip()
        if completed == "0":
            planner.update_progress(user_id, [])
        else:
            completed_indices = [int(i)-1 for i in completed.split(",") if i.strip().isdigit()]
            planner.update_progress(user_id, completed_indices)
            planner.promote_if_ready(user_id)

if __name__ == "__main__":
    main()
