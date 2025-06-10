interface ReminderEmailData {
  userName: string;
  problemTitle: string;
  problemSlug: string;
  problemDifficulty: "EASY" | "MEDIUM" | "HARD";
  scheduledDate: string;
}

interface DailyDigestData {
  userName: string;
  todayReminders: Array<{
    problemTitle: string;
    problemSlug: string;
    problemDifficulty: "EASY" | "MEDIUM" | "HARD";
  }>;
  upcomingReminders: Array<{
    problemTitle: string;
    problemSlug: string;
    problemDifficulty: "EASY" | "MEDIUM" | "HARD";
    scheduledDate: string;
  }>;
}

interface WeeklyReportData {
  userName: string;
  completedProblems: number;
  totalReminders: number;
  easyCompleted: number;
  mediumCompleted: number;
  hardCompleted: number;
  weekStartDate: string;
  weekEndDate: string;
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "EASY":
      return "#00b8a3";
    case "MEDIUM":
      return "#ffc01e";
    case "HARD":
      return "#ff375f";
    default:
      return "#6b7280";
  }
};

const getDifficultyBadge = (difficulty: string) => {
  const color = getDifficultyColor(difficulty);
  return `
    <span style="
      background-color: ${color};
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: bold;
      text-transform: uppercase;
    ">
      ${difficulty}
    </span>
  `;
};

export const reminderEmailTemplate = (data: ReminderEmailData) => {
  const leetcodeUrl = `https://leetcode.com/problems/${data.problemSlug}`;

  return {
    subject: `🎯 Time to solve: ${data.problemTitle}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>LeetCode Reminder</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🎯 LeetTrack Reminder</h1>
            <p style="color: #f0f0f0; margin: 10px 0 0 0; font-size: 16px;">Time to sharpen your coding skills!</p>
          </div>

          <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
            <h2 style="color: #2d3748; margin-top: 0;">Hi ${data.userName}! 👋</h2>
            <p style="font-size: 16px; margin-bottom: 20px;">
              It's time to tackle your scheduled problem:
            </p>

            <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid ${getDifficultyColor(data.problemDifficulty)};">
              <h3 style="margin-top: 0; color: #2d3748; font-size: 20px;">${data.problemTitle}</h3>
              <p style="margin: 10px 0;">
                Difficulty: ${getDifficultyBadge(data.problemDifficulty)}
              </p>
              <p style="color: #666; font-size: 14px; margin: 10px 0;">
                Scheduled for: ${data.scheduledDate}
              </p>
            </div>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${leetcodeUrl}"
               style="background: #ffa116; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block; transition: background-color 0.3s;">
              🚀 Solve Problem on LeetCode
            </a>
          </div>

          <div style="background: #e2e8f0; padding: 20px; border-radius: 8px; margin-top: 30px;">
            <h4 style="margin-top: 0; color: #2d3748;">💡 Quick Tips:</h4>
            <ul style="color: #4a5568; padding-left: 20px;">
              <li>Read the problem statement carefully</li>
              <li>Think about edge cases</li>
              <li>Start with a brute force solution, then optimize</li>
              <li>Test your solution with the provided examples</li>
            </ul>
          </div>

          <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #666; font-size: 14px;">
            <p>Happy coding! 🎉</p>
            <p style="margin: 5px 0;">
              <a href="#" style="color: #667eea; text-decoration: none;">Manage your reminders</a> |
              <a href="#" style="color: #667eea; text-decoration: none;">Unsubscribe</a>
            </p>
          </div>
        </body>
      </html>
    `,
    text: `
      Hi ${data.userName}!

      It's time to tackle your scheduled LeetCode problem:

      Problem: ${data.problemTitle}
      Difficulty: ${data.problemDifficulty}
      Scheduled for: ${data.scheduledDate}

      Solve it here: ${leetcodeUrl}

      Happy coding!
      LeetTrack Team
    `,
  };
};

export const dailyDigestTemplate = (data: DailyDigestData) => {
  return {
    subject: `📊 Your Daily LeetCode Digest - ${data.todayReminders.length} problems today`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Daily Digest</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">📊 Daily Digest</h1>
            <p style="color: #f0f0f0; margin: 10px 0 0 0; font-size: 16px;">Your coding journey summary</p>
          </div>

          <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
            <h2 style="color: #2d3748; margin-top: 0;">Good morning, ${data.userName}! ☀️</h2>

            ${
              data.todayReminders.length > 0
                ? `
              <h3 style="color: #2d3748; border-bottom: 2px solid #4facfe; padding-bottom: 10px;">🎯 Today's Problems (${data.todayReminders.length})</h3>
              ${data.todayReminders
                .map(
                  (problem) => `
                <div style="background: white; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid ${getDifficultyColor(problem.problemDifficulty)};">
                  <h4 style="margin: 0 0 5px 0; color: #2d3748;">${problem.problemTitle}</h4>
                  <p style="margin: 5px 0;">
                    ${getDifficultyBadge(problem.problemDifficulty)}
                  </p>
                  <a href="https://leetcode.com/problems/${problem.problemSlug}"
                     style="color: #4facfe; text-decoration: none; font-size: 14px;">
                    View Problem →
                  </a>
                </div>
              `,
                )
                .join("")}
            `
                : `
              <div style="background: white; padding: 20px; border-radius: 8px; text-align: center; color: #666;">
                <p>🎉 No problems scheduled for today! Take a well-deserved break or explore new challenges.</p>
              </div>
            `
            }

            ${
              data.upcomingReminders.length > 0
                ? `
              <h3 style="color: #2d3748; border-bottom: 2px solid #00f2fe; padding-bottom: 10px; margin-top: 30px;">📅 Upcoming This Week</h3>
              ${data.upcomingReminders
                .slice(0, 3)
                .map(
                  (problem) => `
                <div style="background: white; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #e2e8f0;">
                  <h4 style="margin: 0 0 5px 0; color: #2d3748;">${problem.problemTitle}</h4>
                  <p style="margin: 5px 0; font-size: 14px; color: #666;">
                    ${getDifficultyBadge(problem.problemDifficulty)} • ${problem.scheduledDate}
                  </p>
                </div>
              `,
                )
                .join("")}
            `
                : ""
            }
          </div>

          <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #666; font-size: 14px;">
            <p>Keep up the great work! 💪</p>
            <p style="margin: 5px 0;">
              <a href="#" style="color: #4facfe; text-decoration: none;">View Dashboard</a> |
              <a href="#" style="color: #4facfe; text-decoration: none;">Manage Settings</a>
            </p>
          </div>
        </body>
      </html>
    `,
    text: `
      Good morning, ${data.userName}!

      Today's Problems (${data.todayReminders.length}):
      ${data.todayReminders.map((p) => `- ${p.problemTitle} (${p.problemDifficulty})`).join("\n")}

      ${
        data.upcomingReminders.length > 0
          ? `
      Upcoming This Week:
      ${data.upcomingReminders
        .slice(0, 3)
        .map(
          (p) =>
            `- ${p.problemTitle} (${p.problemDifficulty}) - ${p.scheduledDate}`,
        )
        .join("\n")}
      `
          : ""
      }

      Keep coding!
      LeetTrack Team
    `,
  };
};

export const weeklyReportTemplate = (data: WeeklyReportData) => {
  const completionRate =
    data.totalReminders > 0
      ? Math.round((data.completedProblems / data.totalReminders) * 100)
      : 0;

  return {
    subject: `📈 Your Weekly Coding Report - ${data.completedProblems} problems solved!`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Weekly Report</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2d3748; margin: 0; font-size: 28px;">📈 Weekly Report</h1>
            <p style="color: #4a5568; margin: 10px 0 0 0; font-size: 16px;">${data.weekStartDate} - ${data.weekEndDate}</p>
          </div>

          <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
            <h2 style="color: #2d3748; margin-top: 0;">Great work this week, ${data.userName}! 🎉</h2>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0;">
              <div style="background: white; padding: 20px; border-radius: 8px; text-align: center; border: 2px solid #48bb78;">
                <h3 style="margin: 0; color: #48bb78; font-size: 32px;">${data.completedProblems}</h3>
                <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">Problems Solved</p>
              </div>
              <div style="background: white; padding: 20px; border-radius: 8px; text-align: center; border: 2px solid #4299e1;">
                <h3 style="margin: 0; color: #4299e1; font-size: 32px;">${completionRate}%</h3>
                <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">Completion Rate</p>
              </div>
            </div>

            <h3 style="color: #2d3748; margin: 30px 0 15px 0;">📊 Difficulty Breakdown</h3>
            <div style="background: white; padding: 20px; border-radius: 8px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin: 10px 0; padding: 10px; background: #f0fff4; border-radius: 6px;">
                <span style="font-weight: bold;">Easy</span>
                <span style="background: #00b8a3; color: white; padding: 4px 12px; border-radius: 20px; font-weight: bold;">${data.easyCompleted}</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin: 10px 0; padding: 10px; background: #fffbf0; border-radius: 6px;">
                <span style="font-weight: bold;">Medium</span>
                <span style="background: #ffc01e; color: white; padding: 4px 12px; border-radius: 20px; font-weight: bold;">${data.mediumCompleted}</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin: 10px 0; padding: 10px; background: #fff5f5; border-radius: 6px;">
                <span style="font-weight: bold;">Hard</span>
                <span style="background: #ff375f; color: white; padding: 4px 12px; border-radius: 20px; font-weight: bold;">${data.hardCompleted}</span>
              </div>
            </div>
          </div>

          <div style="background: #e6fffa; padding: 20px; border-radius: 8px; border-left: 4px solid #38b2ac;">
            <h4 style="margin-top: 0; color: #2d3748;">🎯 Keep the momentum going!</h4>
            <p style="color: #4a5568; margin-bottom: 0;">
              ${
                completionRate >= 80
                  ? "Outstanding performance! You're crushing your coding goals. 🚀"
                  : completionRate >= 60
                    ? "Great progress! You're building a solid coding habit. 💪"
                    : "Every problem solved is progress. Keep pushing forward! 🌟"
              }
            </p>
          </div>

          <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #666; font-size: 14px;">
            <p>Here's to another productive week! 🎊</p>
            <p style="margin: 5px 0;">
              <a href="#" style="color: #38b2ac; text-decoration: none;">View Detailed Stats</a> |
              <a href="#" style="color: #38b2ac; text-decoration: none;">Set New Goals</a>
            </p>
          </div>
        </body>
      </html>
    `,
    text: `
      Weekly Report for ${data.userName}
      ${data.weekStartDate} - ${data.weekEndDate}

      📊 Your Stats:
      - Problems Solved: ${data.completedProblems}
      - Completion Rate: ${completionRate}%

      Difficulty Breakdown:
      - Easy: ${data.easyCompleted}
      - Medium: ${data.mediumCompleted}
      - Hard: ${data.hardCompleted}

      ${
        completionRate >= 80
          ? "Outstanding performance! You're crushing your coding goals."
          : completionRate >= 60
            ? "Great progress! You're building a solid coding habit."
            : "Every problem solved is progress. Keep pushing forward!"
      }

      Keep coding!
      LeetTrack Team
    `,
  };
};
