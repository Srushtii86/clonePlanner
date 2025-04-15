from flask import Flask, request, jsonify
from planner.scheduler import StudyPlanner
import os
from flask_cors import CORS
import json


app = Flask(__name__)
CORS(app)

dataset_path = os.path.join("data", "expanded_study_plan_dataset.json")
user_data_path = os.path.join(os.path.dirname(__file__), "user_data.json")

# Create a StudyPlanner instance
planner = StudyPlanner(dataset_path, user_data_path=user_data_path)

@app.route("/register", methods=["POST"])
def register_user():
    data = request.get_json()

    user_id = data.get("user_id")
    goals = data.get("goals")
    goals_with_priority = data.get("goals_with_priority")
    user_levels = data.get("user_levels")
    days_left = data.get("days_left")
    study_hours = data.get("study_hours")

    # if not all([user_id, goals, goals_with_priority, user_levels, days_left, study_hours]):
    #     return jsonify({"error": "Missing required fields"}), 400
    if not all([user_id, days_left, study_hours]):
        return jsonify({"error": "Missing required fields"}), 400

    if goals is None or goals_with_priority is None or user_levels is None:
        return jsonify({"error": "Missing required list fields"}), 400

    # optionally, check if lists are non-empty if required
    if not goals or not goals_with_priority or not user_levels:
        return jsonify({"error": "Goals, priorities, and levels cannot be empty."}), 400


    try:
        goals_with_priority = {k: int(v) for k, v in goals_with_priority.items()}  # 🔧 Add this line

        planner.register_user(
            user_id,
            goals,
            goals_with_priority,
            int(days_left),
            int(study_hours),
            user_levels
        )
        plan = planner.get_daily_plan(user_id)
        return jsonify({"message": "User registered successfully", "plan" : plan}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/user/<user_id>", methods=["GET"])
def get_user_data(user_id):
    try:
        user = planner.get_user_data(user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404
        return jsonify(user), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/generate_plan/<user_id>", methods=["GET"])
def generate_plan(user_id):
    try:
        plan = planner.get_daily_plan(user_id)
        return jsonify({"day_plan": plan}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/tasks/<user_id>', methods=['GET'])
def get_tasks(user_id):
    try:
        with open('user_data.json') as f:
            users = json.load(f)
        user = users.get(user_id)

        if not user:
            return jsonify({"error": "User not found"}), 404

        # Extract tasks from the 'history' field
        history = user.get('history', {})
        tasks = []
        for day_tasks in history.values():
            tasks.extend(day_tasks)  # Add each day's tasks to the list

        return jsonify(tasks), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(port=5001, debug=True)
