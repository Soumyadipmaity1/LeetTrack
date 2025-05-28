import { randomUUID } from "node:crypto";
import {
  PrismaClient,
  REMINDER_STATUS,
} from "../src/lib/generated/prisma-client";

const prisma = new PrismaClient();

// Define interfaces for function parameters
interface UserCreateParams {
  name: string;
  email: string;
  emailVerified?: Date | null;
  image?: string;
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
  problemLink: string;
  scheduledDate: Date;
  reminderStatus?: REMINDER_STATUS;
}

// Sample problem data for different platforms
const SAMPLE_PROBLEMS = [
  {
    id: "1",
    name: "Two Sum",
    statement:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    link: "https://leetcode.com/problems/two-sum/",
    platform: "LeetCode",
  },
  {
    id: "2",
    name: "Add Two Numbers",
    statement:
      "You are given two non-empty linked lists representing two non-negative integers.",
    link: "https://leetcode.com/problems/add-two-numbers/",
    platform: "LeetCode",
  },
  {
    id: "3",
    name: "Longest Substring Without Repeating Characters",
    statement:
      "Given a string s, find the length of the longest substring without repeating characters.",
    link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    platform: "LeetCode",
  },
  {
    id: "SPOJ_PRIME1",
    name: "Prime Generator",
    statement:
      "Peter wants to generate some prime numbers for his cryptosystem.",
    link: "https://www.spoj.com/problems/PRIME1/",
    platform: "SPOJ",
  },
  {
    id: "CF_1A",
    name: "Theatre Square",
    statement:
      "Theatre Square in the capital city of Berland has a rectangular shape with the size n × m meters.",
    link: "https://codeforces.com/problemset/problem/1/A",
    platform: "Codeforces",
  },
  {
    id: "HR_SOLVE_ME_FIRST",
    name: "Solve Me First",
    statement:
      "Complete the function solveMeFirst to compute the sum of two integers.",
    link: "https://www.hackerrank.com/challenges/solve-me-first/problem",
    platform: "HackerRank",
  },
];

async function main(): Promise<void> {
  console.log("🌱 Starting database seeding...");

  // Clear existing data
  await clearDatabase();

  // Create users
  const user1 = await createUser({
    name: "Alice Johnson",
    email: "alice@example.com",
    emailVerified: new Date(),
    image: "https://ui-avatars.com/api/?name=Alice+Johnson",
  });

  const user2 = await createUser({
    name: "Bob Smith",
    email: "bob@example.com",
    emailVerified: new Date(),
    image: "https://ui-avatars.com/api/?name=Bob+Smith",
  });

  const user3 = await createUser({
    name: "Charlie Brown",
    email: "charlie@example.com",
    emailVerified: null, // Not verified yet
    image: "https://ui-avatars.com/api/?name=Charlie+Brown",
  });

  // Create accounts for users (OAuth providers)
  await createAccount({
    userId: user1.id,
    type: "oauth",
    provider: "google",
    providerAccountId: "google_123456789",
    access_token: "ya29.example_access_token",
    refresh_token: "refresh_token_example",
    expires_at: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
    token_type: "Bearer",
    scope: "openid email profile",
  });

  await createAccount({
    userId: user2.id,
    type: "oauth",
    provider: "github",
    providerAccountId: "github_987654321",
    access_token: "gho_example_access_token",
    token_type: "token",
    scope: "read:user user:email",
  });

  await createAccount({
    userId: user3.id,
    type: "oauth",
    provider: "discord",
    providerAccountId: "discord_555666777",
    access_token: "discord_access_token_example",
    refresh_token: "discord_refresh_token",
    expires_at: Math.floor(Date.now() / 1000) + 7200, // 2 hours from now
    token_type: "Bearer",
    scope: "identify email",
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

  // Create verification tokens
  await createVerificationToken(
    "alice@example.com",
    "verification_token_alice"
  );
  await createVerificationToken(
    "newuser@example.com",
    "verification_token_newuser"
  );

  // Create reminders for users
  await createRemindersForUser(user1.id, "Alice");
  await createRemindersForUser(user2.id, "Bob");
  await createRemindersForUser(user3.id, "Charlie");

  console.log("✅ Database seeding completed successfully!");
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
  const { name, email, emailVerified, image } = params;

  const user = await prisma.user.create({
    data: {
      name,
      email,
      emailVerified,
      image,
    },
  });

  console.log(`👤 Created user: ${name} (${email})`);
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
      problemLink,
      scheduledDate,
      reminderStatus,
    },
  });

  console.log(
    `⏰ Created reminder: ${problemName} for ${scheduledDate.toLocaleDateString()}`
  );
  return reminder;
}

async function createRemindersForUser(userId: string, userName: string) {
  const now = new Date();

  // Create reminders with different statuses and dates
  const reminders = [
    // Upcoming reminders (future dates)
    {
      problem: SAMPLE_PROBLEMS[0],
      scheduledDate: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000), // Tomorrow
      status: REMINDER_STATUS.UPCOMING,
    },
    {
      problem: SAMPLE_PROBLEMS[1],
      scheduledDate: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      status: REMINDER_STATUS.UPCOMING,
    },
    {
      problem: SAMPLE_PROBLEMS[2],
      scheduledDate: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
      status: REMINDER_STATUS.UPCOMING,
    },

    // Pending reminders (past due dates)
    {
      problem: SAMPLE_PROBLEMS[3],
      scheduledDate: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      status: REMINDER_STATUS.PENDING,
    },
    {
      problem: SAMPLE_PROBLEMS[4],
      scheduledDate: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      status: REMINDER_STATUS.PENDING,
    },

    // Completed reminders
    {
      problem: SAMPLE_PROBLEMS[5],
      scheduledDate: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
      status: REMINDER_STATUS.COMPLETED,
    },
  ];

  for (const reminderData of reminders) {
    await createReminder({
      userId,
      problemId: reminderData.problem?.id,
      problemName: reminderData.problem?.name,
      problemStatement: reminderData.problem?.statement,
      problemLink:
        reminderData.problem?.link ||
        "https://www.youtube.com/watch?v=M11lpq6yimk",
      scheduledDate: reminderData.scheduledDate,
      reminderStatus: reminderData.status,
    });
  }

  // Create some reminders without problem details (just links)
  await createReminder({
    userId,
    problemLink: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
    scheduledDate: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now
    reminderStatus: REMINDER_STATUS.UPCOMING,
  });

  await createReminder({
    userId,
    problemLink: "https://codeforces.com/problemset/problem/4/A",
    scheduledDate: new Date(now.getTime() + 21 * 24 * 60 * 60 * 1000), // 3 weeks from now
    reminderStatus: REMINDER_STATUS.UPCOMING,
  });

  console.log(`📚 Created reminders for ${userName}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
