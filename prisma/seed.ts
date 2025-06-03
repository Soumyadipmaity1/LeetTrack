import {
  NOTIFICATION_METHOD,
  PrismaClient,
  PROBLEM_DIFFICULTY,
  REMINDER_STATUS,
} from "@prisma-client";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

// Define interfaces for function parameters
interface UserCreateParams {
  email: string;
  emailVerified?: Date | null;
  name?: string;
  image?: string;
  leetCodeUsername: string;
  bio?: string;
  goals?: string;
  preferredNotificationMethod?: NOTIFICATION_METHOD;
}

interface AccountCreateParams {
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  access_token?: string;
  refresh_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
}

interface SessionCreateParams {
  userId: string;
  expires: Date;
}

interface ReminderCreateParams {
  userId: string;
  problemId?: string;
  problemName?: string;
  problemStatement?: string;
  problemTags?: string[];
  problemDifficulty?: PROBLEM_DIFFICULTY;
  problemLink: string;
  scheduledDate: Date;
  reminderStatus?: REMINDER_STATUS;
}

interface LeetCodeProblem {
  id: string;
  name: string;
  statement: string;
  link: string;
  difficulty: PROBLEM_DIFFICULTY;
  tags: string[];
}

// Sample LeetCode problems with realistic data
const LEETCODE_PROBLEMS: LeetCodeProblem[] = [
  {
    id: "1",
    name: "Two Sum",
    statement:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    link: "https://leetcode.com/problems/two-sum/",
    difficulty: PROBLEM_DIFFICULTY.EASY,
    tags: ["Array", "Hash Table"],
  },
  {
    id: "2",
    name: "Add Two Numbers",
    statement:
      "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit.",
    link: "https://leetcode.com/problems/add-two-numbers/",
    difficulty: PROBLEM_DIFFICULTY.MEDIUM,
    tags: ["Linked List", "Math", "Recursion"],
  },
  {
    id: "3",
    name: "Longest Substring Without Repeating Characters",
    statement:
      "Given a string s, find the length of the longest substring without repeating characters.",
    link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    difficulty: PROBLEM_DIFFICULTY.MEDIUM,
    tags: ["Hash Table", "String", "Sliding Window"],
  },
  {
    id: "4",
    name: "Median of Two Sorted Arrays",
    statement:
      "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
    link: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
    difficulty: PROBLEM_DIFFICULTY.HARD,
    tags: ["Array", "Binary Search", "Divide and Conquer"],
  },
  {
    id: "5",
    name: "Longest Palindromic Substring",
    statement:
      "Given a string s, return the longest palindromic substring in s.",
    link: "https://leetcode.com/problems/longest-palindromic-substring/",
    difficulty: PROBLEM_DIFFICULTY.MEDIUM,
    tags: ["String", "Dynamic Programming"],
  },
  {
    id: "20",
    name: "Valid Parentheses",
    statement:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    link: "https://leetcode.com/problems/valid-parentheses/",
    difficulty: PROBLEM_DIFFICULTY.EASY,
    tags: ["String", "Stack"],
  },
  {
    id: "21",
    name: "Merge Two Sorted Lists",
    statement:
      "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists in a one sorted list.",
    link: "https://leetcode.com/problems/merge-two-sorted-lists/",
    difficulty: PROBLEM_DIFFICULTY.EASY,
    tags: ["Linked List", "Recursion"],
  },
  {
    id: "23",
    name: "Merge k Sorted Lists",
    statement:
      "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
    link: "https://leetcode.com/problems/merge-k-sorted-lists/",
    difficulty: PROBLEM_DIFFICULTY.HARD,
    tags: [
      "Linked List",
      "Divide and Conquer",
      "Heap (Priority Queue)",
      "Merge Sort",
    ],
  },
  {
    id: "42",
    name: "Trapping Rain Water",
    statement:
      "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    link: "https://leetcode.com/problems/trapping-rain-water/",
    difficulty: PROBLEM_DIFFICULTY.HARD,
    tags: [
      "Array",
      "Two Pointers",
      "Dynamic Programming",
      "Stack",
      "Monotonic Stack",
    ],
  },
  {
    id: "121",
    name: "Best Time to Buy and Sell Stock",
    statement:
      "You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.",
    link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    difficulty: PROBLEM_DIFFICULTY.EASY,
    tags: ["Array", "Dynamic Programming"],
  },
  {
    id: "200",
    name: "Number of Islands",
    statement:
      "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.",
    link: "https://leetcode.com/problems/number-of-islands/",
    difficulty: PROBLEM_DIFFICULTY.MEDIUM,
    tags: [
      "Array",
      "Depth-First Search",
      "Breadth-First Search",
      "Union Find",
      "Matrix",
    ],
  },
  {
    id: "206",
    name: "Reverse Linked List",
    statement:
      "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    link: "https://leetcode.com/problems/reverse-linked-list/",
    difficulty: PROBLEM_DIFFICULTY.EASY,
    tags: ["Linked List", "Recursion"],
  },
];

async function main(): Promise<void> {
  console.log("🌱 Starting LeetCode reminder system database seeding...");

  // Clear existing data
  await clearDatabase();

  // Create users with different profiles
  const user1 = await createUser({
    email: "alice.coder@example.com",
    emailVerified: new Date(),
    name: "Alice Johnson",
    image: "https://ui-avatars.com/api/?name=Alice+Johnson",
    leetCodeUsername: "alice_codes",
    bio: "Software Engineer passionate about algorithms and data structures. Currently preparing for FAANG interviews.",
    goals:
      "Solve 300 LeetCode problems by end of year. Focus on Dynamic Programming and Graph algorithms.",
    preferredNotificationMethod: NOTIFICATION_METHOD.EMAIl,
  });

  const user2 = await createUser({
    email: "bob.developer@example.com",
    emailVerified: new Date(),
    name: "Bob Smith",
    image: "https://ui-avatars.com/api/?name=Bob+Smith",
    leetCodeUsername: "bob_dev_2024",
    bio: "Full-stack developer looking to strengthen problem-solving skills. Love working on challenging algorithmic problems.",
    goals:
      "Master all medium-level problems. Improve speed and accuracy in coding interviews.",
    preferredNotificationMethod: NOTIFICATION_METHOD.PUSH_NOTIFICATION,
  });

  const user3 = await createUser({
    email: "charlie.student@example.com",
    emailVerified: null, // Not verified yet
    name: "Charlie Brown",
    image: "https://ui-avatars.com/api/?name=Charlie+Brown",
    leetCodeUsername: "charlie_learns",
    bio: "Computer Science student. New to competitive programming but eager to learn and improve.",
    goals:
      "Build strong foundation with easy problems. Practice daily for consistency.",
    preferredNotificationMethod: NOTIFICATION_METHOD.EMAIl,
  });

  const user4 = await createUser({
    email: "diana.expert@example.com",
    emailVerified: new Date(),
    name: "Diana Wilson",
    image: "https://ui-avatars.com/api/?name=Diana+Wilson",
    leetCodeUsername: "diana_algorithms",
    bio: "Senior Software Engineer with 8+ years experience. Mentor for coding interview preparation.",
    goals:
      "Maintain problem-solving skills. Focus on hard problems and optimization techniques.",
    preferredNotificationMethod: NOTIFICATION_METHOD.PUSH_NOTIFICATION,
  });

  // Create accounts for users (OAuth providers)
  await createAccount({
    userId: user1.id,
    type: "oauth",
    provider: "google",
    providerAccountId: "google_alice_123456789",
    access_token: "ya29.alice_access_token_example",
    refresh_token: "alice_refresh_token_example",
    expires_at: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
    token_type: "Bearer",
    scope: "openid email profile",
    id_token: "alice_id_token_example",
  });

  await createAccount({
    userId: user2.id,
    type: "oauth",
    provider: "github",
    providerAccountId: "github_bob_987654321",
    access_token: "gho_bob_access_token_example",
    token_type: "token",
    scope: "read:user user:email",
  });

  await createAccount({
    userId: user3.id,
    type: "oauth",
    provider: "discord",
    providerAccountId: "discord_charlie_555666777",
    access_token: "charlie_discord_access_token",
    refresh_token: "charlie_discord_refresh_token",
    expires_at: Math.floor(Date.now() / 1000) + 7200, // 2 hours from now
    token_type: "Bearer",
    scope: "identify email",
  });

  await createAccount({
    userId: user4.id,
    type: "oauth",
    provider: "google",
    providerAccountId: "google_diana_111222333",
    access_token: "ya29.diana_access_token_example",
    refresh_token: "diana_refresh_token_example",
    expires_at: Math.floor(Date.now() / 1000) + 3600,
    token_type: "Bearer",
    scope: "openid email profile",
  });

  // Create sessions for users
  await createSession({
    userId: user1.id,
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
  });

  await createSession({
    userId: user2.id,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
  });

  await createSession({
    userId: user4.id,
    expires: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
  });

  // Create verification tokens
  await createVerificationToken(
    "alice.coder@example.com",
    "verification_token_alice_123"
  );
  await createVerificationToken(
    "newuser@example.com",
    "verification_token_newuser_456"
  );
  await createVerificationToken(
    "charlie.student@example.com",
    "verification_token_charlie_789"
  );

  // Create reminders for users with different patterns
  await createRemindersForUser(user1.id, "Alice", "advanced"); // Advanced user - mix of all difficulties
  await createRemindersForUser(user2.id, "Bob", "intermediate"); // Intermediate user - easy to medium
  await createRemindersForUser(user3.id, "Charlie", "beginner"); // Beginner user - mostly easy
  await createRemindersForUser(user4.id, "Diana", "expert"); // Expert user - focus on hard problems

  console.log(
    "✅ LeetCode reminder system database seeding completed successfully!"
  );
}

async function clearDatabase(): Promise<void> {
  type TableName = {
    tablename: string;
  };

  const tablenames = await prisma.$queryRaw<TableName[]>`
    SELECT tablename FROM pg_tables WHERE schemaname='public'
  `;

  const tables = tablenames
    .map(({ tablename }) => tablename)
    .filter((name) => name !== "_prisma_migrations")
    .map((name) => `"public"."${name}"`)
    .join(", ");

  try {
    if (tables.length > 0) {
      await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`);
      console.log("🧹 Cleared all existing data");
    }
  } catch (error) {
    console.log("Error clearing database:", error);
  }
}

async function createUser(params: UserCreateParams) {
  const {
    email,
    emailVerified,
    name,
    image,
    leetCodeUsername,
    bio = "",
    goals = "",
    preferredNotificationMethod = NOTIFICATION_METHOD.EMAIl,
  } = params;

  const user = await prisma.user.create({
    data: {
      email,
      emailVerified,
      name,
      image,
      leetCodeUsername,
      bio,
      goals,
      preferredNotificationMethod,
    },
  });

  console.log(`👤 Created user: ${name} (@${leetCodeUsername}) - ${email}`);
  return user;
}

async function createAccount(params: AccountCreateParams) {
  const {
    userId,
    type,
    provider,
    providerAccountId,
    access_token,
    refresh_token,
    expires_at,
    token_type,
    scope,
    id_token,
    session_state,
  } = params;

  const account = await prisma.account.create({
    data: {
      userId,
      type,
      provider,
      providerAccountId,
      access_token,
      refresh_token,
      expires_at,
      token_type,
      scope,
      id_token,
      session_state,
    },
  });

  console.log(`🔐 Created ${provider} account for user ${userId}`);
  return account;
}

async function createSession(params: SessionCreateParams) {
  const { userId, expires } = params;

  const sessionToken = `session_${randomUUID()}`;

  const session = await prisma.session.create({
    data: {
      sessionToken,
      userId,
      expires,
    },
  });

  console.log(`📱 Created session for user ${userId}`);
  return session;
}

async function createVerificationToken(identifier: string, token: string) {
  const verificationToken = await prisma.verificationToken.create({
    data: {
      identifier,
      token,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
    },
  });

  console.log(`✉️ Created verification token for ${identifier}`);
  return verificationToken;
}

async function createReminder(params: ReminderCreateParams) {
  const {
    userId,
    problemId,
    problemName,
    problemStatement,
    problemTags = [],
    problemDifficulty = PROBLEM_DIFFICULTY.EASY,
    problemLink,
    scheduledDate,
    reminderStatus = REMINDER_STATUS.UPCOMING,
  } = params;

  const reminder = await prisma.reminder.create({
    data: {
      userId,
      problemId,
      problemName,
      problemStatement,
      problemTags,
      problemDifficulty,
      problemLink,
      scheduledDate,
      reminderStatus,
    },
  });

  console.log(
    `⏰ Created reminder: ${problemName} (${problemDifficulty}) for ${scheduledDate.toLocaleDateString()}`
  );
  return reminder;
}

async function createRemindersForUser(
  userId: string,
  userName: string,
  userLevel: "beginner" | "intermediate" | "advanced" | "expert"
) {
  const now = new Date();

  // Filter problems based on user level
  let problemsToUse: LeetCodeProblem[] = [];

  switch (userLevel) {
    case "beginner":
      problemsToUse = LEETCODE_PROBLEMS.filter(
        (p) => p.difficulty === PROBLEM_DIFFICULTY.EASY
      );
      break;
    case "intermediate":
      problemsToUse = LEETCODE_PROBLEMS.filter(
        (p) =>
          p.difficulty === PROBLEM_DIFFICULTY.EASY ||
          p.difficulty === PROBLEM_DIFFICULTY.MEDIUM
      );
      break;
    case "advanced":
      problemsToUse = LEETCODE_PROBLEMS; // All difficulties
      break;
    case "expert":
      problemsToUse = LEETCODE_PROBLEMS.filter(
        (p) =>
          p.difficulty === PROBLEM_DIFFICULTY.MEDIUM ||
          p.difficulty === PROBLEM_DIFFICULTY.HARD
      );
      break;
  }

  // Create different types of reminders based on user level
  const reminderConfigs = [
    // Upcoming reminders (future dates)
    {
      daysOffset: 1,
      status: REMINDER_STATUS.UPCOMING,
      count: userLevel === "expert" ? 3 : 2,
    },
    {
      daysOffset: 3,
      status: REMINDER_STATUS.UPCOMING,
      count: 2,
    },
    {
      daysOffset: 7,
      status: REMINDER_STATUS.UPCOMING,
      count: userLevel === "beginner" ? 1 : 2,
    },
    {
      daysOffset: 14,
      status: REMINDER_STATUS.UPCOMING,
      count: 1,
    },

    // Pending reminders (past due dates)
    {
      daysOffset: -2,
      status: REMINDER_STATUS.PENDING,
      count: userLevel === "beginner" ? 1 : 2,
    },
    {
      daysOffset: -5,
      status: REMINDER_STATUS.PENDING,
      count: 1,
    },

    // Completed reminders
    {
      daysOffset: -10,
      status: REMINDER_STATUS.COMPLETED,
      count: userLevel === "expert" ? 4 : userLevel === "advanced" ? 3 : 2,
    },
    {
      daysOffset: -20,
      status: REMINDER_STATUS.COMPLETED,
      count: 2,
    },
  ];

  let problemIndex = 0;

  for (const config of reminderConfigs) {
    for (
      let i = 0;
      i < config.count && problemIndex < problemsToUse.length;
      i++
    ) {
      const problem = problemsToUse[problemIndex];
      const scheduledDate = new Date(
        now.getTime() + config.daysOffset * 24 * 60 * 60 * 1000
      );

      await createReminder({
        userId,
        problemId: problem.id,
        problemName: problem.name,
        problemStatement: problem.statement,
        problemTags: problem.tags,
        problemDifficulty: problem.difficulty,
        problemLink: problem.link,
        scheduledDate,
        reminderStatus: config.status,
      });

      problemIndex++;
    }
  }

  // Create some additional reminders with just links (no detailed problem info)
  const additionalLinks = [
    "https://leetcode.com/problems/container-with-most-water/",
    "https://leetcode.com/problems/3sum/",
    "https://leetcode.com/problems/climbing-stairs/",
    "https://leetcode.com/problems/maximum-subarray/",
  ];

  for (let i = 0; i < Math.min(2, additionalLinks.length); i++) {
    await createReminder({
      userId,
      problemLink: additionalLinks[i],
      scheduledDate: new Date(
        now.getTime() + (21 + i * 7) * 24 * 60 * 60 * 1000
      ), // 3+ weeks from now
      reminderStatus: REMINDER_STATUS.UPCOMING,
      problemDifficulty: PROBLEM_DIFFICULTY.MEDIUM,
    });
  }

  console.log(`📚 Created ${userLevel} level reminders for ${userName}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
