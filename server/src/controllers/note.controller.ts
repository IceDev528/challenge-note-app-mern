import { Request, Response } from "express";
import { Note, INote } from "../models/note.model";

export async function getNotes(req: Request, res: Response) {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getNoteByID(req: Request, res: Response) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).send("Note not found");
      return;
    }
    res.json(note);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function createNote(req: Request, res: Response) {
  const newNote = new Note(req.body);

  try {
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function updateNote(req: Request, res: Response) {
  const id = req.params.id;
  const noteUpdates: INote = req.body;

  try {
    const note = await Note.findByIdAndUpdate(id, noteUpdates, {
      new: true,
    });

    if (!note) {
      res.status(404).send("Note not found");
      return;
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function deleteNote(req: Request, res: Response) {
  const id = req.params.id;

  try {
    const note = await Note.findByIdAndDelete(id);

    if (!note) {
      res.status(404).send("Note not found");
      return;
    }

    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function updateNoteArchieve(req: Request, res: Response) {
  const id = req.params.id;
  const noteUpdates: INote = req.body;

  try {
    const note = await Note.findByIdAndUpdate(id, noteUpdates, {
      new: true,
    });

    if (!note) {
      res.status(404).send("Note not found");
      return;
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(400).send(error);
  }
}