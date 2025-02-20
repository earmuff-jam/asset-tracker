import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Profiles: a
    .model({
      id: a.id(),
      username: a.string(),
      firstName: a.string(),
      lastName: a.string(),
      avatarURL: a.string(),
      emailAddress: a.string(),
      phoneNumber: a.string(),
      aboutMe: a.string(),
      imageURL: a.string(),
      isDarkMode: a.boolean(),
      isGridView: a.boolean(),
      isOnline: a.boolean(),
      lastOnlineLocationPoint: a.customType({
        lat: a.float(),
        long: a.float(),
      }),
      created: a.string(),
      createdId: a.string(),
      creator: a.string(),
      updated: a.string(),
      updatedId: a.string(),
      updator: a.string(),
      createdNotes: a.hasMany("Notes", "createdNoteId"),
      updatedNotes: a.hasMany("Notes", "updatedNoteId"),
    })
    .authorization((allow) => [allow.authenticated()]),

  Status: a
    .model({
      id: a.id(),
      name: a.string(),
      description: a.string(),
      statusId: a.id(),
      notes: a.hasMany("Notes", "statusId"),
    })
    .authorization((allow) => [allow.authenticated()]),

  Notes: a
    .model({
      id: a.id(),
      title: a.string(),
      description: a.string(),
      statusId: a.id(),
      status: a.belongsTo("Status", "statusId"),
      color: a.string(),
      completionDate: a.string(),
      location: a.customType({
        lat: a.float(),
        long: a.float(),
      }),
      created: a.string(),
      createdNoteId: a.id(),
      createdId: a.belongsTo("Profiles", "createdNoteId"),
      updated: a.string(),
      updatedNoteId: a.id(),
      updatedId: a.belongsTo("Profiles", "updatedNoteId"),
      collaborators: a.string().array(),
    })
    .authorization((allow) => [allow.authenticated()]),

});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
