/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const currentDate = new Date();

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("services").del();
  await knex("services").insert([
    {
      id_seller: 5,
      title: "Linira Design - Jasa design struktur bangunan",
      description: "zzzz",
      status: "harga satuan",
      category: "design",
      sub_category: "structure",
      price: 200000,
      photo:
        "https://hesa.co.id/wp-content/uploads/2022/01/Audit-Struktur-Bangunan-Sistem-Struktur-dan-Beban.jpg",
      link_portofolio:
        "https://hesa.co.id/wp-content/uploads/2022/01/Audit-Struktur-Bangunan-Sistem-Struktur-dan-Beban.jpg",
      created_at: currentDate,
      updated_at: currentDate,
    },
    {
      id_seller: 5,
      title: "Linira Design - Jasa design arsitektur, interior bangunan",
      description: "zzzz",
      status: "harga satuan",
      category: "design",
      sub_category: "architecture",
      price: 150000,
      photo: "https://www.rrenggservices.com/images/mepdesign.jpg",
      link_portofolio: "https://www.rrenggservices.com/images/mepdesign.jpg",
      created_at: currentDate,
      updated_at: currentDate,
    },
    {
      id_seller: 5,
      title: "Linira Design - Jasa design landscape, halaman, area outdoor",
      description: "zzzz",
      status: "harga satuan",
      category: "design",
      sub_category: "landscape",
      price: 100000,
      photo: "https://i.ytimg.com/vi/8-KJLWaKKQg/sddefault.jpg",
      link_portofolio: "https://i.ytimg.com/vi/8-KJLWaKKQg/sddefault.jpg",
      created_at: currentDate,
      updated_at: currentDate,
    },
    {
      id_seller: 5,
      title: "Linira Design - Jasa design Mekanikal, elektrikal dan plumbing",
      description: "zzzz",
      status: "borongan",
      category: "design",
      sub_category: "MEP",
      price: 120000,
      photo:
        "https://www.blueladderepc.com/wp-content/uploads/2023/02/MEP-design-vetting.webp",
      link_portofolio:
        "https://www.blueladderepc.com/wp-content/uploads/2023/02/MEP-design-vetting.webp",
      created_at: currentDate,
      updated_at: currentDate,
    },
    {
      id_seller: 6,
      title: "RID Construction - Jasa konstruksi struktur beton",
      description: "zzzz",
      status: "borongan",
      category: "construction",
      sub_category: "struktur beton bertulang",
      price: 2000000,
      photo:
        "https://www.pinhome.id/kamus-istilah-properti/wp-content/uploads/2021/09/konstruksi-2.webp",
      link_portofolio:
        "https://www.pinhome.id/kamus-istilah-properti/wp-content/uploads/2021/09/konstruksi-2.webp",
      created_at: currentDate,
      updated_at: currentDate,
    },
    {
      id_seller: 6,
      title: "RID Construction - Jasa konstruksi arsitektur",
      description: "zzzz",
      status: "harga satuan",
      category: "construction",
      sub_category:
        "arsitektur / finishing (pasangan lantai, dinding, kusen, plafond)",
      price: 1400000,
      photo:
        "https://www.lamudi.co.id/journal/wp-content/uploads/2022/11/Biaya-Pasang-Keramik-Per-Meter.jpg",
      link_portofolio:
        "https://www.lamudi.co.id/journal/wp-content/uploads/2022/11/Biaya-Pasang-Keramik-Per-Meter.jpg",
      created_at: currentDate,
      updated_at: currentDate,
    },
    {
      id_seller: 6,
      title: "RID Construction - Jasa konstruksi struktur atap",
      description: "zzzz",
      status: "borongan",
      category: "construction",
      sub_category: "struktur atap dan penutup atap",
      price: 4950000,
      photo:
        "https://novotest.id/wp-content/uploads/Struktur-Atap-Bangunan.jpg",
      link_portofolio:
        "https://novotest.id/wp-content/uploads/Struktur-Atap-Bangunan.jpg",
      created_at: currentDate,
      updated_at: currentDate,
    },
  ]);
};
