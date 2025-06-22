export const getAllNotes = async (req, res) => {
  res.status(200).send("You just fetched the notes");
};

export const createNote = (req, res) => {
  res.status(200).json({ message: "Note created successfully" });
};

export const updateNote = (req, res) => {
  res.status(200).json({ message: "Note updated successfully" });
};

export const deleteNote = (req, res) => {
  res.status(200).json({ message: "Note deleted successfully" });
};
