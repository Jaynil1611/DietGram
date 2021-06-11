export const intialState = {
  posts: [
    {
      id: "11111",
      content:
        "Lorem ipsum dolor sit @amet consectetur elit. Expedita quos asperiores suscipit in, odio nam id nihil quas nulla sint #dolor, fugiat tenetur animi fugit corrupti quisquam amet necessitatibus excepturi.",
      createdAt: new Date().toISOString(),
      userId: {
        id: "123",
        firstname: "Jaynil",
        lastname: "Gaglani",
        username: "Jaynil",
        profile_image_url:
          "https://pbs.twimg.com/profile_images/1285827114369859584/rb1rv3dS_400x400.jpg",
        cover_image_url:
          "https://pbs.twimg.com/profile_banners/3184859874/1609649069/1080x360",
        description:
          "Lorem ipsum dolor sit @amet consectetur elit. Expedita quos asperiores suscipit in, odio nam id nihil quas nulla sint #dolor, fugiat tenetur animi fugit corrupti quisquam amet necessitatibus excepturi.",
        location: "Mumbai, India",
        url: "https://t.co/vcADpUbvvy?amp=1",
        followers: [{}],
        following: [{}],
      },
      likes: {
        count: 0,
        reactors: [
          {
            id: "1133",
            firstname: "Hetav",
            lastname: "Desai",
            username: "@Hetav_Desai",
            profile_image_url:
              "https://pbs.twimg.com/profile_images/1285827114369859584/rb1rv3dS_400x400.jpg",
            cover_image_url:
              "https://pbs.twimg.com/profile_banners/3184859874/1609649069/1080x360",
            description:
              "Lorem ipsum dolor sit @amet consectetur elit. Expedita quos asperiores suscipit in, odio nam id nihil quas nulla sint #dolor, fugiat tenetur animi fugit corrupti quisquam amet necessitatibus excepturi.",
            location: "Mumbai, India",
            url: "https://t.co/vcADpUbvvy?amp=1",
            followers: [{}],
            following: [{}],
          },
        ],
      },
    },
    {
      id: "11112",
      content:
        "Lorem ipsum dolor sit @amet consectetur elit. Expedita quos asperiores suscipit in, odio nam id nihil quas nulla sint #dolor, fugiat tenetur animi fugit corrupti quisquam amet necessitatibus excepturi.",
      createdAt: new Date().toISOString(),
      userId: {
        id: "123",
        firstname: "Jaynil",
        lastname: "Gaglani",
        username: "Jaynil",
        profile_image_url:
          "https://pbs.twimg.com/profile_images/1285827114369859584/rb1rv3dS_400x400.jpg",
      },
      likes: { count: 0, reactors: [{ id: "1133" }] },
    },
    {
      id: "11113",
      content:
        "Lorem ipsum dolor sit @amet consectetur elit. Expedita quos asperiores suscipit in, odio nam id nihil quas nulla sint #dolor, fugiat tenetur animi fugit corrupti quisquam amet necessitatibus excepturi.",
      createdAt: new Date().toISOString(),
      userId: {
        id: "123",
        firstname: "Jaynil",
        lastname: "Gaglani",
        username: "Jaynil",
        profile_image_url:
          "https://pbs.twimg.com/profile_images/1285827114369859584/rb1rv3dS_400x400.jpg",
      },
      likes: { count: 0, reactors: [{ id: "1133" }] },
    },
  ],

  users: [
    {
      id: "1133",
      firstname: "Jaynil",
      lastname: "Gaglani",
      username: "Jaynil_Gaglani",
      email: "jaynil@gmail.com",
      profile_image_url:
        "https://pbs.twimg.com/profile_images/1285827114369859584/rb1rv3dS_400x400.jpg",
      url: "https://github.com/Jaynil1611",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita quos asperiores suscipit in, odio nam id nihil quas nulla sint dolor, fugiat tenetur anim",
      location: "",
      birth_date: "",
      followers: [{}],
      following: [{}],
    },
  ],
};
