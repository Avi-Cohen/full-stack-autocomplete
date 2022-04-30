import axios from "axios";

async function getEmailsList(debouncedTerm) {
  try {
    const { data } = await axios.get("http://localhost:5001/api/contacts", {
      params: {
        action: "query",
        list: "search",
        origin: "*",
        format: "json",
        srsearch: debouncedTerm,
      },
    });
    return data.length > 0 ? data.map((contact) => contact.email) : [];
  } catch (e) {
    console.log(e.stack);
  }
}
const contactsService = {
  getEmailsList,
};

export default contactsService;
