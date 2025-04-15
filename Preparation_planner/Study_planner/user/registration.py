def register_new_user(planner, user_id):
    print("🆕 New user detected. Let's get you registered.")

    goals = input("Enter your goals separated by commas (e.g. Gate, Placements, Web development, Machine learning): ").strip().split(",")
    goals = [g.strip().lower() for g in goals]

    goals_with_priority = {}
    print("\n🎯 Assign priority for each goal (higher = more important):")
    for goal in goals:
        priority = int(input(f"Priority for {goal}: "))
        goals_with_priority[goal] = priority

    user_levels = {}
    print("\n📈 Specify your current level for each goal (beginner / intermediate / advanced):")
    for goal in goals:
        while True:
            level = input(f"Current level for {goal}: ").strip().lower()
            if level in {"beginner", "intermediate", "advanced"}:
                user_levels[goal] = level
                break
            else:
                print("❌ Invalid level. Please enter 'beginner', 'intermediate', or 'advanced'.")

    days_left = int(input("\n📅 How many days left for your preparation? "))
    hours_per_day = int(input("⏰ How many hours can you study per day? "))

    planner.register_user(user_id, goals, goals_with_priority, days_left, hours_per_day, user_levels)
    print("\n✅ Registration successful!\n")
