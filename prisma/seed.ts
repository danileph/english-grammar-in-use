import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const units = [
    {
      order: 1,
      title: "Present continuous and present simple: state verbs and performatives",
      topic: "Tenses",
      estimatedMinutes: 15,
    },
    {
      order: 2,
      title: "Using present continuous and present simple",
      topic: "Tenses",
      estimatedMinutes: 15,
    },
    {
      order: 3,
      title: "Past simple and present perfect",
      topic: "Tenses",
      estimatedMinutes: 15,
    },
    {
      order: 4,
      title: "Past continuous and past simple",
      topic: "Tenses",
      estimatedMinutes: 15,
    },
    {
      order: 5,
      title: "Past perfect and past simple",
      topic: "Tenses",
      estimatedMinutes: 15,
    },
    {
      order: 6,
      title: "Present perfect continuous and present perfect",
      topic: "Tenses",
      estimatedMinutes: 15,
    },
    {
      order: 7,
      title: "Past perfect continuous, past perfect and past continuous",
      topic: "Tenses",
      estimatedMinutes: 15,
    },
    {
      order: 8,
      title: "Present and past time: review",
      topic: "Tenses",
      estimatedMinutes: 15,
    },
    {
      order: 9,
      title: "Will and be going to",
      topic: "The future",
      estimatedMinutes: 15,
    },
    {
      order: 10,
      title: "Present simple and present continuous for the future",
      topic: "The future",
      estimatedMinutes: 15,
    },
    {
      order: 11,
      title: "Future continuous, future perfect and future perfect continuous",
      topic: "The future",
      estimatedMinutes: 15,
    },
    {
      order: 12,
      title: "Be to + infinitive; be about to + infinitive",
      topic: "The future",
      estimatedMinutes: 15,
    },
    {
      order: 13,
      title: "Other ways of talking about the future",
      topic: "The future",
      estimatedMinutes: 15,
    },
    {
      order: 14,
      title: "The future seen from the past",
      topic: "The future",
      estimatedMinutes: 15,
    },
    {
      order: 15,
      title: "Can, could, be able to and be allowed to",
      topic: "Modals and semi-modals",
      estimatedMinutes: 15,
    },
    {
      order: 16,
      title: "Will, would and used to",
      topic: "Modals and semi-modals",
      estimatedMinutes: 15,
    },
    {
      order: 17,
      title: "May and might",
      topic: "Modals and semi-modals",
      estimatedMinutes: 15,
    },
    {
      order: 18,
      title: "Must and have (got) to",
      topic: "Modals and semi-modals",
      estimatedMinutes: 15,
    },
    {
      order: 19,
      title: "Need(n't), don't need to and don't have to",
      topic: "Modals and semi-modals",
      estimatedMinutes: 15,
    },
    {
      order: 20,
      title: "Should, ought to and had better",
      topic: "Modals and semi-modals",
      estimatedMinutes: 15,
    },
    {
      order: 21,
      title: "Linking verbs: be, appear, seem; become, get, etc.",
      topic: "Linking verbs, passives, questions",
      estimatedMinutes: 15,
    },
    {
      order: 22,
      title: "Using passives",
      topic: "Linking verbs, passives, questions",
      estimatedMinutes: 15,
    },
    {
      order: 23,
      title: "Forming passive sentences: objects, complements and multi-word verbs",
      topic: "Linking verbs, passives, questions",
      estimatedMinutes: 15,
    },
    {
      order: 24,
      title: "Forming passive sentences: verb + -ing or to-infinitive",
      topic: "Linking verbs, passives, questions",
      estimatedMinutes: 15,
    },
    {
      order: 25,
      title: "Reporting with passives; It is said that ...",
      topic: "Linking verbs, passives, questions",
      estimatedMinutes: 15,
    },
    {
      order: 26,
      title: "Wh-questions with who, whom, which, how and whose",
      topic: "Linking verbs, passives, questions",
      estimatedMinutes: 15,
    },
    {
      order: 27,
      title: "Negative questions; echo questions; questions with that-clauses",
      topic: "Linking verbs, passives, questions",
      estimatedMinutes: 15,
    },
    {
      order: 28,
      title: "Verbs, objects and complements",
      topic: "Verb complementation: what follows verbs",
      estimatedMinutes: 15,
    },
    {
      order: 29,
      title: "Verb + two objects",
      topic: "Verb complementation: what follows verbs",
      estimatedMinutes: 15,
    },
    {
      order: 30,
      title: "Verb + -ing forms and infinitives 1",
      topic: "Verb complementation: what follows verbs",
      estimatedMinutes: 15,
    },
    {
      order: 31,
      title: "Verb + -ing forms and infinitives 2",
      topic: "Verb complementation: what follows verbs",
      estimatedMinutes: 15,
    },
    {
      order: 32,
      title: "Reporting people's words and thoughts",
      topic: "Reporting",
      estimatedMinutes: 15,
    },
    {
      order: 33,
      title: "Reporting statements: that-clauses",
      topic: "Reporting",
      estimatedMinutes: 15,
    },
    {
      order: 34,
      title: "Verb + wh-clause",
      topic: "Reporting",
      estimatedMinutes: 15,
    },
    {
      order: 35,
      title: "Tense choice in reporting",
      topic: "Reporting",
      estimatedMinutes: 15,
    },
    {
      order: 36,
      title: "Reporting offers, suggestions, orders, intentions, etc.",
      topic: "Reporting",
      estimatedMinutes: 15,
    },
    {
      order: 37,
      title: "Modal verbs in reporting",
      topic: "Reporting",
      estimatedMinutes: 15,
    },
    {
      order: 38,
      title: "Reporting what people say using nouns and adjectives",
      topic: "Reporting",
      estimatedMinutes: 15,
    },
    {
      order: 39,
      title: "Should in that-clauses; the present subjunctive",
      topic: "Reporting",
      estimatedMinutes: 15,
    },
    {
      order: 40,
      title: "Agreement between subject and verb 1",
      topic: "Nouns",
      estimatedMinutes: 15,
    },
    {
      order: 41,
      title: "Agreement between subject and verb 2",
      topic: "Nouns",
      estimatedMinutes: 15,
    },
    {
      order: 42,
      title: "Agreement between subject and verb 3",
      topic: "Nouns",
      estimatedMinutes: 15,
    },
    {
      order: 43,
      title: "Compound nouns and noun phrases",
      topic: "Nouns",
      estimatedMinutes: 15,
    },
    {
      order: 44,
      title: "A / an and one",
      topic: "Articles, determiners and quantifiers",
      estimatedMinutes: 15,
    },
    {
      order: 45,
      title: "A / an, the and zero article 1",
      topic: "Articles, determiners and quantifiers",
      estimatedMinutes: 15,
    },
    {
      order: 46,
      title: "A / an, the and zero article 2",
      topic: "Articles, determiners and quantifiers",
      estimatedMinutes: 15,
    },
    {
      order: 47,
      title: "A / an, the and zero article 3",
      topic: "Articles, determiners and quantifiers",
      estimatedMinutes: 15,
    },
    {
      order: 48,
      title: "Some and any",
      topic: "Articles, determiners and quantifiers",
      estimatedMinutes: 15,
    },
    {
      order: 49,
      title: "No, none (of) and not any",
      topic: "Articles, determiners and quantifiers",
      estimatedMinutes: 15,
    },
    {
      order: 50,
      title: "Much (of), many (of), a lot of, lots (of), etc.",
      topic: "Articles, determiners and quantifiers",
      estimatedMinutes: 15,
    },
    {
      order: 51,
      title: "All (of), whole, every, each",
      topic: "Articles, determiners and quantifiers",
      estimatedMinutes: 15,
    },
    {
      order: 52,
      title: "Few, little, less, fewer",
      topic: "Articles, determiners and quantifiers",
      estimatedMinutes: 15,
    },
    {
      order: 53,
      title: "Relative pronouns",
      topic: "Relative clauses and other types of clause",
      estimatedMinutes: 15,
    },
    {
      order: 54,
      title: "Other relative words: whose, when, whereby, etc.",
      topic: "Relative clauses and other types of clause",
      estimatedMinutes: 15,
    },
    {
      order: 55,
      title: "Prepositions in relative clauses",
      topic: "Relative clauses and other types of clause",
      estimatedMinutes: 15,
    },
    {
      order: 56,
      title:
        "Other ways of adding information to noun phrases 1: additional noun phrases, etc.",
      topic: "Relative clauses and other types of clause",
      estimatedMinutes: 15,
    },
    {
      order: 57,
      title:
        "Other ways of adding information to noun phrases 2: prepositional phrases, etc.",
      topic: "Relative clauses and other types of clause",
      estimatedMinutes: 15,
    },
    {
      order: 58,
      title: "Participle clauses with adverbial meaning 1",
      topic: "Relative clauses and other types of clause",
      estimatedMinutes: 15,
    },
    {
      order: 59,
      title: "Participle clauses with adverbial meaning 2",
      topic: "Relative clauses and other types of clause",
      estimatedMinutes: 15,
    },
    {
      order: 60,
      title: "Reflexive pronouns: herself, himself, themselves, etc.",
      topic: "Pronouns, substitution and leaving out words",
      estimatedMinutes: 15,
    },
    {
      order: 61,
      title: "One and ones",
      topic: "Pronouns, substitution and leaving out words",
      estimatedMinutes: 15,
    },
    {
      order: 62,
      title: "So and not as substitutes for clauses, etc.",
      topic: "Pronouns, substitution and leaving out words",
      estimatedMinutes: 15,
    },
    {
      order: 63,
      title: "Do so; such",
      topic: "Pronouns, substitution and leaving out words",
      estimatedMinutes: 15,
    },
    {
      order: 64,
      title: "More on ellipsis after auxiliary verbs",
      topic: "Pronouns, substitution and leaving out words",
      estimatedMinutes: 15,
    },
    {
      order: 65,
      title: "Ellipsis of to-infinitives",
      topic: "Pronouns, substitution and leaving out words",
      estimatedMinutes: 15,
    },
  ];

  await prisma.unit.deleteMany({});
  await prisma.unit.createMany({ data: units });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
