export type PracticeBlank = {
  id: string;
  placeholder: string;
  options: string[];
  value?: string;
};

export type PracticeExerciseItem = {
  id: string;
  label: string;
  parts: string[];
  blanks: PracticeBlank[];
  correctSentences?: string[];
  mistakeReviewHtml?: string;
  choiceChecks?: Array<{
    id: string;
    options: [string, string];
    acceptedOptionIndexes: number[];
  }>;
};

export type PracticeExercise = {
  id: string;
  instruction: string;
  practiceSectionLabel?: string;
  wordBankLabel: string;
  wordBank: string[];
  items: PracticeExerciseItem[];
};

export type PracticeExerciseStep = {
  id: string;
  label: string;
  status: "completed" | "current" | "upcoming";
};

export type PracticeMockData = {
  contextLine: string;
  pageTitle: string;
  lessonTitleLineOne: string;
  lessonTitleLineTwo: string;
  steps: PracticeExerciseStep[];
  exercises: PracticeExercise[];
  completedExercises: number;
  totalExercises: number;
  currentExerciseNumber: number;
};

const unit1Exercise11: PracticeExercise = {
  id: "1.1",
  instruction:
    "Complete each pair of sentences using the same verb (in a question form or negative if necessary) from the box. Use the present continuous; if this is not possible, use the present simple. You may use any words outside the gap and contracted forms where appropriate.",
  practiceSectionLabel: "A & B",
  wordBankLabel: "A & B",
  wordBank: ["attract", "consist of", "doubt", "feel", "fit", "have", "like", "look", "measure", "sound"],
  items: [
    {
      id: "1a",
      label: "1a",
      parts: ["I hear you're having your house repainted. How ^ it ", " ? (or How ^ it ", " ?)",],
      blanks: [
        { id: "1a-blank-1", placeholder: "................", options: ["look"] },
        { id: "1a-blank-2", placeholder: "................", options: ["look"] },
      ],
      correctSentences: [
        "I hear you're having your house repainted. How does it look? (or How is it looking?)",
        "I hear you're having your house repainted. How's it looking? (or How does it look?)",
      ],
    },
    {
      id: "1b",
      label: "1b",
      parts: ["I bought this new dress today. How ^ it ", " ?"],
      blanks: [{ id: "1b-blank-1", placeholder: "................", options: ["look"] }],
      correctSentences: ["I bought this new dress today. How does it look?"],
    },
    {
      id: "2a",
      label: "2a",
      parts: ["A: What are you doing with that ruler? B: I ", " the area of the kitchen."],
      blanks: [{ id: "2a-blank-1", placeholder: "................", options: ["measure"] }],
      correctSentences: ["A: What are you doing with that ruler? B: I am measuring the area of the kitchen."],
    },
    {
      id: "2b",
      label: "2b",
      parts: ["The garden ", " 12 by 20 metres."],
      blanks: [{ id: "2b-blank-1", placeholder: "................", options: ["measure"] }],
      correctSentences: ["The garden measures 12 by 20 metres."],
    },
    {
      id: "3a",
      label: "3a",
      parts: ["I ", " whether I'll get another chance to retake the exam."],
      blanks: [{ id: "3a-blank-1", placeholder: "................", options: ["doubt"] }],
      correctSentences: ["I doubt whether I'll get another chance to retake the exam."],
    },
    {
      id: "3b",
      label: "3b",
      parts: ["I suppose she might be at home tonight, but I ", " it."],
      blanks: [{ id: "3b-blank-1", placeholder: "................", options: ["doubt"] }],
      correctSentences: ["I suppose she might be at home tonight, but I doubt it."],
    },
    {
      id: "4a",
      label: "4a",
      parts: ["The new science museum currently ", " 10,000 visitors a month."],
      blanks: [{ id: "4a-blank-1", placeholder: "................", options: ["attract"] }],
      correctSentences: ["The new science museum currently attracts 10,000 visitors a month."],
    },
    {
      id: "4b",
      label: "4b",
      parts: ["Flowers ", " bees with their brightly-coloured petals."],
      blanks: [{ id: "4b-blank-1", placeholder: "................", options: ["attract"] }],
      correctSentences: ["Flowers attract bees with their brightly-coloured petals."],
    },
    {
      id: "5a",
      label: "5a",
      parts: ["Carlos won't work at the top of the 20-storey building because he ", " heights."],
      blanks: [{ id: "5a-blank-1", placeholder: "................", options: ["like"] }],
      correctSentences: ["Carlos won't work at the top of the 20-storey building because he doesn't like heights."],
    },
    {
      id: "5b",
      label: "5b",
      parts: ["A: How's the new job? B: Well, at the moment, I ", " it at all."],
      blanks: [{ id: "5b-blank-1", placeholder: "................", options: ["like"] }],
      correctSentences: [
        "A: How's the new job? B: Well, at the moment, I don't like it at all.",
        "A: How's the new job? B: Well, at the moment, I'm not liking it at all.",
      ],
    },
    {
      id: "6a",
      label: "6a",
      parts: ["My car's in the garage today. They ", " new brakes."],
      blanks: [{ id: "6a-blank-1", placeholder: "................", options: ["fit"] }],
      correctSentences: ["My car's in the garage today. They are fitting new brakes."],
    },
    {
      id: "6b",
      label: "6b",
      parts: ["I bought this jumper for Anna, but it ", " her so I'll have to take it back."],
      blanks: [{ id: "6b-blank-1", placeholder: "................", options: ["fit"] }],
      correctSentences: ["I bought this jumper for Anna, but it doesn't fit her so I'll have to take it back."],
    },
    {
      id: "7a",
      label: "7a",
      parts: ["What's your shirt made from? It ", " like silk."],
      blanks: [{ id: "7a-blank-1", placeholder: "................", options: ["feel"] }],
      correctSentences: ["What's your shirt made from? It feels like silk."],
    },
    {
      id: "7b",
      label: "7b",
      parts: ["I won't be coming to work today. I ", " very well."],
      blanks: [{ id: "7b-blank-1", placeholder: "................", options: ["feel"] }],
      correctSentences: [
        "I won't be coming to work today. I don't feel very well.",
        "I won't be coming to work today. I'm not feeling very well.",
      ],
    },
    {
      id: "8a",
      label: "8a",
      parts: ["The roof of the house ", " only plastic sheets nailed down in a few places."],
      blanks: [{ id: "8a-blank-1", placeholder: "................", options: ["consist of"] }],
      correctSentences: ["The roof of the house consists of only plastic sheets nailed down in a few places."],
    },
    {
      id: "8b",
      label: "8b",
      parts: ["Their school uniform ", " black trousers and a dark green jumper."],
      blanks: [{ id: "8b-blank-1", placeholder: "................", options: ["consist of"] }],
      correctSentences: ["Their school uniform consists of black trousers and a dark green jumper."],
    },
    {
      id: "9a",
      label: "9a",
      parts: ["Simon's new song ", " quite good, but he doesn't think he's ready yet to perform it in public."],
      blanks: [{ id: "9a-blank-1", placeholder: "................", options: ["sound"] }],
      correctSentences: [
        "Simon's new song sounds quite good, but he doesn't think he's ready yet to perform it in public.",
      ],
    },
    {
      id: "9b",
      label: "9b",
      parts: ["A: What's that noise? B: It ", " like a bird stuck in the chimney."],
      blanks: [{ id: "9b-blank-1", placeholder: "................", options: ["sound"] }],
      correctSentences: ["A: What's that noise? B: It sounds like a bird stuck in the chimney."],
    },
    {
      id: "10a",
      label: "10a",
      parts: ["Poulson ", " treatment for a knee injury, but should be fit to play on Saturday."],
      blanks: [{ id: "10a-blank-1", placeholder: "................", options: ["have"] }],
      correctSentences: ["Poulson is having treatment for a knee injury, but should be fit to play on Saturday."],
    },
    {
      id: "10b",
      label: "10b",
      parts: ["My sister ", " long blonde hair. You're bound to recognise her."],
      blanks: [{ id: "10b-blank-1", placeholder: "................", options: ["have"] }],
      correctSentences: ["My sister has long blonde hair. You're bound to recognise her."],
    },
  ],
};

const unit1Exercise12: PracticeExercise = {
  id: "1.2",
  instruction: "Cross out any improbable answers.",
  practiceSectionLabel: "C & D",
  wordBankLabel: "",
  wordBank: [],
  items: [
    {
      id: "letter",
      label: "",
      parts: [""],
      blanks: [
        {
          id: "letter-blank-1",
          placeholder:
            "Dear Aunt Mara,\n\nThanks for your message. I (1) apologise / I'm apologising for not getting back to you sooner, but I've been incredibly busy. When I went into nursing, you warned me that it would be really hard work, but I (2) admit / I'm admitting that I didn't really believe you. Don't get me wrong - I (3) don't suggest / I'm not suggesting that I'm not enjoying it. It's incredibly rewarding, but I (4) now realise / I'm now realising how hard the job is. When I get home I just eat (not very well, I (5) confess / I'm confessing) and go straight to bed. It doesn't help that the bus journey to the hospital is so slow. I (6) consider / I'm considering buying a car, which will make things easier, I hope.\n\nAnd what about you? How (7) do you find / are you finding living in a village after so many years in the city? I (8) know / I'm knowing how difficult it is for you to travel such a long way, but it would be lovely if you could come and stay with me for a weekend. I've got plenty of room in my flat. I (9) don't guarantee / I'm not guaranteeing to cook as well as you do, but I (10) promise / I'm promising to find time to show you around this lovely old town.\n\nHope to see you soon. Keep in touch.\n\nLove,\n\nMartina",
          options: [],
        },
      ],
      correctSentences: [
        "Dear Aunt Mara,\n\nThanks for your message. I (1) apologise for not getting back to you sooner, but I've been incredibly busy. When I went into nursing, you warned me that it would be really hard work, but I (2) admit that I didn't really believe you. Don't get me wrong - I (3) I'm not suggesting that I'm not enjoying it. It's incredibly rewarding, but I (4) now realise how hard the job is. When I get home I just eat (not very well, I (5) confess) and go straight to bed. It doesn't help that the bus journey to the hospital is so slow. I (6) I'm considering buying a car, which will make things easier, I hope.\n\nAnd what about you? How (7) are you finding living in a village after so many years in the city? I (8) know how difficult it is for you to travel such a long way, but it would be lovely if you could come and stay with me for a weekend. I've got plenty of room in my flat. I (9) don't guarantee to cook as well as you do, but I (10) promise to find time to show you around this lovely old town.\n\nHope to see you soon. Keep in touch.\n\nLove,\n\nMartina",
        "Dear Aunt Mara,\n\nThanks for your message. I (1) apologise for not getting back to you sooner, but I've been incredibly busy. When I went into nursing, you warned me that it would be really hard work, but I (2) admit that I didn't really believe you. Don't get me wrong - I (3) don't suggest that I'm not enjoying it. It's incredibly rewarding, but I (4) now realise how hard the job is. When I get home I just eat (not very well, I (5) confess) and go straight to bed. It doesn't help that the bus journey to the hospital is so slow. I (6) I'm considering buying a car, which will make things easier, I hope.\n\nAnd what about you? How (7) are you finding living in a village after so many years in the city? I (8) know how difficult it is for you to travel such a long way, but it would be lovely if you could come and stay with me for a weekend. I've got plenty of room in my flat. I (9) don't guarantee to cook as well as you do, but I (10) promise to find time to show you around this lovely old town.\n\nHope to see you soon. Keep in touch.\n\nLove,\n\nMartina",
        "Dear Aunt Mara,\n\nThanks for your message. I (1) apologise for not getting back to you sooner, but I've been incredibly busy. When I went into nursing, you warned me that it would be really hard work, but I (2) admit that I didn't really believe you. Don't get me wrong - I (3) I'm not suggesting that I'm not enjoying it. It's incredibly rewarding, but I (4) now realise how hard the job is. When I get home I just eat (not very well, I (5) confess) and go straight to bed. It doesn't help that the bus journey to the hospital is so slow. I (6) I'm considering buying a car, which will make things easier, I hope.\n\nAnd what about you? How (7) do you find living in a village after so many years in the city? I (8) know how difficult it is for you to travel such a long way, but it would be lovely if you could come and stay with me for a weekend. I've got plenty of room in my flat. I (9) don't guarantee to cook as well as you do, but I (10) promise to find time to show you around this lovely old town.\n\nHope to see you soon. Keep in touch.\n\nLove,\n\nMartina",
        "Dear Aunt Mara,\n\nThanks for your message. I (1) apologise for not getting back to you sooner, but I've been incredibly busy. When I went into nursing, you warned me that it would be really hard work, but I (2) admit that I didn't really believe you. Don't get me wrong - I (3) don't suggest that I'm not enjoying it. It's incredibly rewarding, but I (4) now realise how hard the job is. When I get home I just eat (not very well, I (5) confess) and go straight to bed. It doesn't help that the bus journey to the hospital is so slow. I (6) I'm considering buying a car, which will make things easier, I hope.\n\nAnd what about you? How (7) do you find living in a village after so many years in the city? I (8) know how difficult it is for you to travel such a long way, but it would be lovely if you could come and stay with me for a weekend. I've got plenty of room in my flat. I (9) don't guarantee to cook as well as you do, but I (10) promise to find time to show you around this lovely old town.\n\nHope to see you soon. Keep in touch.\n\nLove,\n\nMartina",
      ],
      mistakeReviewHtml:
        "Dear Aunt Mara,<br /><br />Thanks for your message. I (1) apologise / <strong><del>I'm apologising</del></strong> for not getting back to you sooner, but I've been incredibly busy. When I went into nursing, you warned me that it would be really hard work, but I (2) admit / <strong><del>I'm admitting</del></strong> that I didn't really believe you. Don't get me wrong - I (3) don't suggest / I'm not suggesting that I'm not enjoying it. It's incredibly rewarding, but I (4) now realise / <strong><del>I'm now realising</del></strong> how hard the job is. When I get home I just eat (not very well, I (5) confess / <strong><del>I'm confessing</del></strong>) and go straight to bed. It doesn't help that the bus journey to the hospital is so slow. I (6) <strong><del>consider</del></strong> / I'm considering buying a car, which will make things easier, I hope.<br /><br />And what about you? How (7) do you find / are you finding living in a village after so many years in the city? I (8) know / <strong><del>I'm knowing</del></strong> how difficult it is for you to travel such a long way, but it would be lovely if you could come and stay with me for a weekend. I've got plenty of room in my flat. I (9) don't guarantee / <strong><del>I'm not guaranteeing</del></strong> to cook as well as you do, but I (10) promise / <strong><del>I'm promising</del></strong> to find time to show you around this lovely old town.<br /><br />Hope to see you soon. Keep in touch.<br /><br />Love,<br /><br />Martina",
      choiceChecks: [
        { id: "1", options: ["apologise", "I'm apologising"], acceptedOptionIndexes: [0] },
        { id: "2", options: ["admit", "I'm admitting"], acceptedOptionIndexes: [0] },
        { id: "3", options: ["don't suggest", "I'm not suggesting"], acceptedOptionIndexes: [0, 1] },
        { id: "4", options: ["now realise", "I'm now realising"], acceptedOptionIndexes: [0] },
        { id: "5", options: ["confess", "I'm confessing"], acceptedOptionIndexes: [0] },
        { id: "6", options: ["consider", "I'm considering"], acceptedOptionIndexes: [1] },
        { id: "7", options: ["do you find", "are you finding"], acceptedOptionIndexes: [0, 1] },
        { id: "8", options: ["know", "I'm knowing"], acceptedOptionIndexes: [0] },
        { id: "9", options: ["don't guarantee", "I'm not guaranteeing"], acceptedOptionIndexes: [0] },
        { id: "10", options: ["promise", "I'm promising"], acceptedOptionIndexes: [0] },
      ],
    },
  ],
};

const unit2Exercise21: PracticeExercise = {
  id: "2.1",
  instruction: "Complete these sentences using the verbs in brackets. Use the present simple or present continuous.",
  practiceSectionLabel: "A & B",
  wordBankLabel: "",
  wordBank: [],
  items: [
    {
      id: "1",
      label: "1",
      parts: [
        "Rodriguez ",
        " to De Mello, who ",
        " just over the bar. The home team ",
        " much more in this half. (pass - shoot - attack)",
      ],
      blanks: [
        { id: "1-blank-1", placeholder: "................", options: ["passes"] },
        { id: "1-blank-2", placeholder: "................", options: ["shoots"] },
        { id: "1-blank-3", placeholder: "................", options: ["are attacking"] },
      ],
      correctSentences: [
        "Rodriguez passes to De Mello, who shoots just over the bar. The home team are attacking much more in this half. (pass - shoot - attack)",
      ],
    },
    {
      id: "2",
      label: "2",
      parts: [
        "A man ",
        " home late one night after the office Christmas party. His wife ",
        " for him, and she ",
        " to him ... (arrive - wait - say)",
      ],
      blanks: [
        { id: "2-blank-1", placeholder: "................", options: ["arrives"] },
        { id: "2-blank-2", placeholder: "................", options: ["is waiting"] },
        { id: "2-blank-3", placeholder: "................", options: ["says"] },
      ],
      correctSentences: [
        "A man arrives home late one night after the office Christmas party. His wife is waiting for him, and she says to him ... (arrive - wait - say)",
      ],
    },
    {
      id: "3",
      label: "3",
      parts: [
        "I went to a concert yesterday in the Town Hall. In the middle of it, while the orchestra ",
        " this man suddenly ",
        " on his seat and ",
        " to conduct them. (play - stand - start)",
      ],
      blanks: [
        { id: "3-blank-1", placeholder: "................", options: ["is playing"] },
        { id: "3-blank-2", placeholder: "................", options: ["stands"] },
        { id: "3-blank-3", placeholder: "................", options: ["starts"] },
      ],
      correctSentences: [
        "I went to a concert yesterday in the Town Hall. In the middle of it, while the orchestra is playing this man suddenly stands on his seat and starts to conduct them. (play - stand - start)",
      ],
    },
  ],
};

const unit2Exercise22: PracticeExercise = {
  id: "2.2",
  instruction:
    "Complete what each person says about the news they have read or heard using the present tense phrases in C.",
  practiceSectionLabel: "C",
  wordBankLabel: "",
  wordBank: [],
  items: [
    {
      id: "1",
      label: "1",
      parts: ["Government gives health service billions\n", " the government's giving ", "."],
      blanks: [
        { id: "1-blank-1", placeholder: "................", options: ["I see"] },
        { id: "1-blank-2", placeholder: "................", options: ["the health service a lot more money"] },
      ],
      correctSentences: [
        "Government gives health service billions\nI see the government's giving the health service a lot more money.",
      ],
    },
    {
      id: "2",
      label: "2",
      parts: ["Vegecorp to sack 1,000 workers.\n", " Vegecorp are going to ", "."],
      blanks: [
        { id: "2-blank-1", placeholder: "................", options: ["I understand"] },
        { id: "2-blank-2", placeholder: "................", options: ["sack 1,000 workers"] },
      ],
      correctSentences: [
        "Vegecorp to sack 1,000 workers.\nI understand Vegecorp are going to sack 1,000 workers.",
        "Vegecorp to sack 1,000 workers.\nI hear Vegecorp are going to sack 1,000 workers.",
      ],
    },
    {
      id: "3",
      label: "3",
      parts: [
        "President Bergman announced a new public holiday on his birthday, August 6th. He made the announcement ...\n",
        " we're going to have ",
        ".",
      ],
      blanks: [
        { id: "3-blank-1", placeholder: "................", options: ["I understand"] },
        { id: "3-blank-2", placeholder: "................", options: ["a new public holiday on August 6th"] },
      ],
      correctSentences: [
        "President Bergman announced a new public holiday on his birthday, August 6th. He made the announcement ...\nI understand we're going to have a new public holiday on August 6th.",
        "President Bergman announced a new public holiday on his birthday, August 6th. He made the announcement ...\nI hear we're going to have a new public holiday on August 6th.",
      ],
    },
    {
      id: "4",
      label: "4",
      parts: ['Ed: "Did you hear that Bruno\'s crashed his car again?"\n', " Bruno's ", "."],
      blanks: [
        { id: "4-blank-1", placeholder: "................", options: ["Ed says"] },
        { id: "4-blank-2", placeholder: "................", options: ["crashed his car again"] },
      ],
      correctSentences: ['Ed: "Did you hear that Bruno\'s crashed his car again?"\nEd says Bruno\'s crashed his car again.'],
    },
    {
      id: "5",
      label: "5",
      parts: ['Julia: "I\'ve got a new job."\n', " she's ", "."],
      blanks: [
        { id: "5-blank-1", placeholder: "................", options: ["Julia tells me"] },
        { id: "5-blank-2", placeholder: "................", options: ["got a new job"] },
      ],
      correctSentences: ['Julia: "I\'ve got a new job."\nJulia tells me she\'s got a new job.'],
    },
    {
      id: "6",
      label: "6",
      parts: [
        "A team of researchers claims to have identified a gene which causes some people to sleep more than others.\n",
        " they've identified ",
        ".",
      ],
      blanks: [
        { id: "6-blank-1", placeholder: "................", options: ["They say"] },
        {
          id: "6-blank-2",
          placeholder: "................",
          options: ["a gene which causes some people to sleep more than others"],
        },
      ],
      correctSentences: [
        "A team of researchers claims to have identified a gene which causes some people to sleep more than others.\nThey say they've identified a gene which causes some people to sleep more than others.",
      ],
    },
  ],
};

const unit2Exercise23: PracticeExercise = {
  id: "2.3",
  instruction: "Expand one of the sets of notes below to complete each dialogue.",
  practiceSectionLabel: "E",
  wordBankLabel: "E",
  wordBank: [
    "continually / change / mind",
    "constantly / criticise / driving",
    "forever / moan / work",
    "forever / ask me / money",
    "always / complain / handwriting",
  ],
  items: [
    {
      id: "1",
      label: "1",
      parts: ["A: I can't read this. B: You're ", "."],
      blanks: [{ id: "1-blank-1", placeholder: "................", options: ["always complaining about my handwriting"] }],
      correctSentences: ["A: I can't read this. B: You're always complaining about my handwriting."],
    },
    {
      id: "2",
      label: "2",
      parts: ["A: Can I borrow €10? B: You're ", "."],
      blanks: [{ id: "2-blank-1", placeholder: "................", options: ["forever asking me for money"] }],
      correctSentences: ["A: Can I borrow €10? B: You're forever asking me for money."],
    },
    {
      id: "3",
      label: "3",
      parts: ["A: That was a dangerous thing to do. B: You're ", "."],
      blanks: [{ id: "3-blank-1", placeholder: "................", options: ["constantly criticising my driving"] }],
      correctSentences: ["A: That was a dangerous thing to do. B: You're constantly criticising my driving."],
    },
    {
      id: "4",
      label: "4",
      parts: ["A: I think I'll stay here after all. B: You're ", "."],
      blanks: [{ id: "4-blank-1", placeholder: "................", options: ["continually changing your mind"] }],
      correctSentences: ["A: I think I'll stay here after all. B: You're continually changing your mind."],
    },
    {
      id: "5",
      label: "5",
      parts: ["A: I had a bad day at the office again. B: You're ", "."],
      blanks: [{ id: "5-blank-1", placeholder: "................", options: ["forever moaning about work"] }],
      correctSentences: ["A: I had a bad day at the office again. B: You're forever moaning about work."],
    },
  ],
};

const unit2Exercise24: PracticeExercise = {
  id: "2.4",
  instruction:
    "Complete each pair of sentences using the same verb (in negative form if necessary). Use the present continuous or the present simple. Use ^ to add any words outside the gap.",
  practiceSectionLabel: "D & E",
  wordBankLabel: "",
  wordBank: [],
  items: [
    {
      id: "1a",
      label: "1a",
      parts: ["A: Shall I phone at six? B: No, we usually ", " dinner at that time."],
      blanks: [{ id: "1a-blank-1", placeholder: "................", options: ["eat"] }],
      correctSentences: ["A: Shall I phone at six? B: No, we usually eat dinner at that time."],
    },
    {
      id: "1b",
      label: "1b",
      parts: ["I ", " lamb, thanks. I'm a vegetarian."],
      blanks: [{ id: "1b-blank-1", placeholder: "................", options: ["don't eat"] }],
      correctSentences: ["I don't eat lamb, thanks. I'm a vegetarian."],
    },
    {
      id: "2a",
      label: "2a",
      parts: ["Gielman ^ ", " Henry V in the latest production at the Royal Theatre."],
      blanks: [{ id: "2a-blank-1", placeholder: "................", options: ["playing"] }],
      correctSentences: ["Gielman is playing Henry V in the latest production at the Royal Theatre."],
    },
    {
      id: "2b",
      label: "2b",
      parts: ["They constantly ^ ", " loud music until the early hours of the morning."],
      blanks: [{ id: "2b-blank-1", placeholder: "................", options: ["playing"] }],
      correctSentences: ["They constantly are playing loud music until the early hours of the morning."],
    },
    {
      id: "3a",
      label: "3a",
      parts: ["I normally ^ ", " the children to school at 8:30. Perhaps we could meet at 9:00."],
      blanks: [{ id: "3a-blank-1", placeholder: "................", options: ["taking"] }],
      correctSentences: ["I normally am taking the children to school at 8:30. Perhaps we could meet at 9:00."],
    },
    {
      id: "3b",
      label: "3b",
      parts: ["In his recent book, Wall ", " a controversial view of Britain's role in the war."],
      blanks: [{ id: "3b-blank-1", placeholder: "................", options: ["takes"] }],
      correctSentences: ["In his recent book, Wall takes a controversial view of Britain's role in the war."],
    },
  ],
};

const unit1Practice: PracticeMockData = {
  contextLine: "Advanced Grammar in Use · Unit 1",
  pageTitle: "Unit 1: Practice",
  lessonTitleLineOne: "State verbs and the present continuous",
  lessonTitleLineTwo: "Exercises 1.1-1.2",
  steps: [
    { id: "1.1", label: "1.1 Complete each pair of sentences", status: "current" },
    { id: "1.2", label: "1.2 Cross out any improbable answers", status: "upcoming" },
  ],
  exercises: [unit1Exercise11, unit1Exercise12],
  completedExercises: 0,
  totalExercises: 2,
  currentExerciseNumber: 1,
};

const unit2Practice: PracticeMockData = {
  contextLine: "Advanced Grammar in Use · Unit 2",
  pageTitle: "Unit 2: Practice",
  lessonTitleLineOne: "Using present continuous and present simple",
  lessonTitleLineTwo: "Exercises 2.1-2.4",
  steps: [
    { id: "2.1", label: "2.1 Complete these sentences", status: "current" },
    { id: "2.2", label: "2.2 Complete what each person says about the news", status: "upcoming" },
    { id: "2.3", label: "2.3 Expand one of the sets of notes", status: "upcoming" },
    { id: "2.4", label: "2.4 Complete each pair of sentences", status: "upcoming" },
  ],
  exercises: [unit2Exercise21, unit2Exercise22, unit2Exercise23, unit2Exercise24],
  completedExercises: 0,
  totalExercises: 4,
  currentExerciseNumber: 1,
};

export function getPracticeMockData(unitOrder: number): PracticeMockData {
  if (unitOrder === 1) {
    return unit1Practice;
  }

  if (unitOrder === 2) {
    return unit2Practice;
  }

  return unit1Practice;
}
