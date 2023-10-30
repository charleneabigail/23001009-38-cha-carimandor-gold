/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const currentDate = new Date();

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("user").del();
  await knex("user").insert([
    {
      name: "Malika",
      password: "qwer",
      email: "malika@mail.com",
      phone_number: "081111111111",
      address: "Jalan Sudirman",
      role: "customer",
      created_at: currentDate,
      updated_at: currentDate,
    },
    {
      name: "Diana",
      password: "asdf",
      email: "diana@mail.com",
      phone_number: "082222222222",
      address: "Jalan Raya Mengwi",
      role: "customer",
      created_at: currentDate,
      updated_at: currentDate,
    },
    {
      name: "Deny",
      password: "zxcv",
      email: "deny@mail.com",
      phone_number: "083333333333",
      address: "Jalan Gunung Agung",
      role: "customer",
      created_at: currentDate,
      updated_at: currentDate,
    },
    {
      name: "Dika",
      password: "tyui",
      email: "dika@mail.com",
      phone_number: "084444444444",
      address: "Jalan Kamboja",
      role: "customer",
      created_at: currentDate,
      updated_at: currentDate,
    },
    {
      name: "Linira Design",
      password: "ghjk",
      email: "linira@mail.com",
      phone_number: "085555555555",
      address: "Jalan Teuku Umar",
      role: "customer",
      created_at: currentDate,
      updated_at: currentDate,
    },
    {
      name: "Rumah Idaman Design & Construction",
      password: "bnmm",
      email: "ridc@mail.com",
      phone_number: "086666666666",
      address: "Jalan Bypass Sanur",
      role: "seller",
      created_at: currentDate,
      updated_at: currentDate,
    },
    {
      name: "Maju Jaya construction",
      password: "poiu",
      email: "majujaya@mail.com",
      phone_number: "087777777777",
      address: "Jalan Kapten Agung",
      role: "seller",
      created_at: currentDate,
      updated_at: currentDate,
    },
    {
      name: "Permata Building Service",
      password: "lkjh",
      email: "permata@mail.com",
      phone_number: "088888888888",
      address: "Jalan Cokroaminoto",
      role: "seller",
      created_at: currentDate,
      updated_at: currentDate,
    },
  ]);
};
