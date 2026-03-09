export type UnitContentBlock =
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "examples";
      items: string[];
    }
  | {
      type: "connector";
      text: string;
    }
  | {
      type: "note";
      text: string;
    }
  | {
      type: "headline-grid";
      items: Array<{
        text: string;
        tone?: "rose" | "amber" | "slate";
      }>;
    };

export type UnitContentSection = {
  id: string;
  label: string;
  title: string;
  tag?: string;
  blocks: UnitContentBlock[];
};

export type UnitContent = {
  sections: UnitContentSection[];
};

const unit1Content: UnitContent = {
  sections: [
    {
      id: "state-verbs",
      label: "A",
      title: "State verbs",
      tag: "Reminder ➜ A1-A5",
      blocks: [
        {
          type: "paragraph",
          text: "We can use the present continuous with some state verbs (e.g. **attract, like, look, love, sound**) to emphasise that a situation is temporary or for a period of time around the present. Compare:",
        },
        {
          type: "examples",
          items: ["Ella stays with us quite often. The children **love** having her here."],
        },
        {
          type: "connector",
          text: "and",
        },
        {
          type: "examples",
          items: ["Ella's with us at the moment. The children **are loving** having her here."],
        },
        {
          type: "paragraph",
          text: "State verbs which we rarely use with the present continuous include **believe, consist of, doubt, own**.",
        },
      ],
    },
    {
      id: "state-and-action-meanings",
      label: "B",
      title: "Some verbs have different meanings",
      blocks: [
        {
          type: "paragraph",
          text: "Some verbs have different meanings when they are used to talk about states and when they describe actions. With their 'state' meanings, they usually take simple rather than continuous forms. With their 'action' meanings, they may take simple or continuous forms, depending on context. Compare:",
        },
        {
          type: "examples",
          items: ["The app **doesn't appear** to work on my phone. (**appear**: *state* = seem)"],
        },
        {
          type: "connector",
          text: "and",
        },
        {
          type: "examples",
          items: ["Carley Robb is currently **appearing** in a musical on Broadway. / She often **appears** in musicals."],
        },
        {
          type: "paragraph",
          text: "(appear: *action* = take part)",
        },
        {
          type: "note",
          text: "Also: **expect, feel, fit, have, imagine, look, measure, see, think, weighe**",
        },
      ],
    },
    {
      id: "mental-state-verbs",
      label: "C",
      title: "Mental state verbs",
      blocks: [
        {
          type: "paragraph",
          text: "With some verbs describing *mental* states (e.g. **find, realise, regret, think, understand**) we can use the present continuous to emphasise that we have recently started to think about something or that we are not sure about something. Compare:",
        },
        {
          type: "examples",
          items: ["**I regret** that the company will have to be sold. (= I've made the decision and I'm sorry about it)"],
        },
        {
          type: "connector",
          text: "and",
        },
        {
          type: "examples",
          items: ["**I'm regretting** my decision to give her the job. (= I'm increasingly aware that it was the wrong decision)"],
        },
        {
          type: "paragraph",
          text: "When it means 'think carefully about', **consider** is often used in the continuous form in the present:",
        },
        {
          type: "examples",
          items: ["**He's considering** taking early retirement. (*not* He considers taking early retirement.)"],
        },
        {
          type: "paragraph",
          text: "Some other verbs describing preferences and mental states (e.g. **agree, believe, conclude, know, prefer**) are rarely used with the present continuous:",
        },
        {
          type: "examples",
          items: ["**I believe** you now. (*not* I'm believing you now.)"],
        },
      ],
    },
    {
      id: "performatives",
      label: "D",
      title: "Performatives",
      blocks: [
        {
          type: "paragraph",
          text: "Verbs which perform the action they describe (= performatives) usually take the present simple:",
        },
        {
          type: "examples",
          items: [
            "**I suggest** you park outside the city and get the bus to the centre.",
            "We **request** that you read the terms and conditions carefully before signing.",
          ],
        },
        {
          type: "note",
          text: "Also: **acknowledge, admit, advise, apologise, beg, confess, congratulate, declare, deny, forbid, guarantee, name, order, permit, predict, promise, refuse, remind, request, thank, warn**",
        },
        {
          type: "paragraph",
          text: "Some verbs used as performatives with the present simple in affirmative (= positive) sentences (**apologise, deny, guarantee, promise, suggest**) have a similar meaning with either the present simple or the present continuous in negative sentences:",
        },
        {
          type: "examples",
          items: ["I **don't deny / I'm not denying** taking the books, but Miguel said it would be okay."],
        },
        {
          type: "paragraph",
          text: "Modals are often used with performatives to make what we say more tentative or polite:",
        },
        {
          type: "examples",
          items: ["We **would advise** you to arrive two hours before the flight leaves.", "I **must beg** you to keep this a secret."],
        },
      ],
    },
  ],
};

const unitContentByOrder: Record<number, UnitContent> = {
  1: unit1Content,
  2: {
    sections: [
      {
        id: "stories-and-anecdotes",
        label: "A",
        title: "Stories and anecdotes",
        tag: "Reminder ➜ A1-A5",
        blocks: [
          {
            type: "paragraph",
            text: "We often use the present simple and present continuous when telling stories and jokes in informal spoken English to create the impression that events are happening now. This can make them more direct and exciting and hold people's attention:",
          },
          {
            type: "examples",
            items: [
              "She **goes** up to this man and **looks** straight into his eyes. He's not **wearing** his glasses, and he **doesn't recognise** her ...",
              "This man's **playing** golf when a kangaroo **bounds** up to him, **grabs** his club and **hits** his ball about half a mile ...",
            ],
          },
          {
            type: "paragraph",
            text: "The main events are usually described in sequence using the present simple and longer background events are described using the present continuous.",
          },
          {
            type: "paragraph",
            text: "In narratives and anecdotes the present simple can be used to highlight an event. Often it is used after past tenses and with a phrase such as **suddenly** or **all of a sudden**:",
          },
          {
            type: "examples",
            items: [
              "So last night, I'm waiting for the bus when this man **walks** up to me and **says** ...",
              "I was in the park reading a newspaper, when **all of a sudden** this dog **jumps** at me.",
            ],
          },
        ],
      },
      {
        id: "live-commentaries",
        label: "B",
        title: "Live commentaries",
        blocks: [
          {
            type: "paragraph",
            text: "We also use the present simple and present continuous in live commentaries (for example, on sports events) when the report takes place at the same time as the action:",
          },
          {
            type: "examples",
            items: [
              "King **serves** to the left-hand court and Adams **makes** a wonderful return. She's **playing** magnificent tennis in this match ...",
            ],
          },
        ],
      },
      {
        id: "introducing-news",
        label: "C",
        title: "Introducing news",
        blocks: [
          {
            type: "paragraph",
            text: "We can use the present simple in phrases such as **It says here, I hear, I gather, I see, I understand** and **They say, (Someone) says, (Someone) tells me** to introduce news that we have heard, read, seen (e.g. on television), or been told. We can also use past tenses (e.g. **Kevin said, I heard**):",
          },
          {
            type: "examples",
            items: [
              "I **gather** you're worried about Pedro.",
              "Sophia **tells** me you're thinking of emigrating.",
              "Professor Hendriks is at the conference and I **hear** she's an excellent speaker.",
            ],
          },
        ],
      },
      {
        id: "headlines-and-contents",
        label: "D",
        title: "Headlines and contents",
        blocks: [
          {
            type: "paragraph",
            text: "The present simple is often used in news headlines to talk about events that have recently happened:",
          },
          {
            type: "headline-grid",
            items: [
              { text: "SECOND QUAKE *HITS* JAPAN", tone: "rose" },
              { text: "FIRE *BREAKS OUT* IN HOTEL ROOM", tone: "amber" },
              { text: "SCIENTISTS *FIND* ICE ON THE MOON", tone: "amber" },
              { text: "FOREIGN MINISTER *RESIGNS*", tone: "slate" },
            ],
          },
          {
            type: "paragraph",
            text: "We can use the present simple to refer to the contents of books, films, newspapers, etc:",
          },
          {
            type: "examples",
            items: [
              "Thompson **gives** a list of the largest European companies in Chapter 6.",
              "At the beginning of the book, three men **find** $4 million in a crashed plane.",
              "In the film, Loni Baranski **takes** the role of a private detective.",
            ],
          },
        ],
      },
      {
        id: "adverbs-with-present-continuous",
        label: "E",
        title: "Adverbs with present continuous",
        blocks: [
          {
            type: "paragraph",
            text: "We can use the present continuous with adverbs such as **always, constantly, continually** or **forever** to emphasise that something is done so often that it is characteristic of a person, group or thing. We often use this pattern to indicate disapproval:",
          },
          {
            type: "examples",
            items: [
              "A: I think I'll stay here after all. B: You're constantly **changing** your mind.",
              "Jacob is a really kind person. He's always **offering** to help me with my work.",
            ],
          },
          {
            type: "paragraph",
            text: "The past continuous is used in a similar way with these adverbs (e.g. **Was** Olivia **always asking** you for money, too?).",
          },
          {
            type: "paragraph",
            text: "We can use the present continuous to describe something we regularly do at a certain time:",
          },
          {
            type: "examples",
            items: [
              "At eight o'clock I'm usually **driving** to work, so phone me on my mobile.",
              "Seven o'clock is a bit early. We're generally **eating** then.",
            ],
          },
        ],
      },
    ],
  },
};

export function getUnitContentByOrder(unitOrder: number): UnitContent | null {
  return unitContentByOrder[unitOrder] ?? null;
}
