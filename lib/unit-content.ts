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
};

export function getUnitContentByOrder(unitOrder: number): UnitContent | null {
  return unitContentByOrder[unitOrder] ?? null;
}
