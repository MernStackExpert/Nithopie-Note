import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export function useNoteData(id) {
  const router = useRouter();

  // Loading & Status States
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [syncStatus, setSyncStatus] = useState("Saved"); // Saved, Saving..., Unsaved

  // Note Data States
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [password, setPassword] = useState("");
  const [tags, setTags] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");

  // Lock Screen States
  const [isLocked, setIsLocked] = useState(false);

  // 1. Fetch Note Data
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await fetch(`/api/notes/${id}`);
        if (!res.ok) throw new Error("Unauthorized or not found");
        const data = await res.json();

        setTitle(data.note.title || "");
        setContent(data.note.content || "");
        setIsPrivate(data.note.isPrivate || false);
        setPassword(data.note.password || "");
        setTags(data.note.tags ? data.note.tags.join(", ") : "");
        setUpdatedAt(
          new Date(data.note.updatedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
        );

        if (data.note.isPrivate) setIsLocked(true);
      } catch (error) {
        toast.error(error.message);
        router.push("/work-space");
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchNote();
  }, [id, router]);

  // 2. Save Logic (Manual & Auto)
  const handleSave = useCallback(
    async (isAutoSave = false) => {
      if (isAutoSave) setSyncStatus("Saving...");
      else setIsSaving(true);

      const tagsArray = tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t !== "");

      try {
        const res = await fetch(`/api/notes/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            content,
            isPrivate,
            password: isPrivate ? password : null,
            tags: tagsArray,
          }),
        });

        if (!res.ok) throw new Error("Failed to save");
        setSyncStatus("Saved");
        if (!isAutoSave) toast.success("Changes saved manually!");
        window.dispatchEvent(new Event("notes-changed"));
      } catch (error) {
        setSyncStatus("Unsaved");
        if (!isAutoSave) toast.error(error.message);
      } finally {
        setIsSaving(false);
      }
    },
    [id, title, content, isPrivate, password, tags],
  );

  // 3. Auto-save Effect
  useEffect(() => {
    if (isLoading || isLocked) return;
    setSyncStatus("Unsaved");
    const timer = setTimeout(() => {
      if (title || content) handleSave(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, [
    title,
    content,
    tags,
    isPrivate,
    password,
    handleSave,
    isLoading,
    isLocked,
  ]);

  // 4. Delete Logic
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#3b82f6",
      confirmButtonText: "Yes, delete it!",
      background: "#0D1117",
      color: "#fff",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`/api/notes/${id}`, { method: "DELETE" });
        if (res.ok) {
          Swal.fire({
            title: "Deleted!",
            text: "Your note has been deleted.",
            icon: "success",
            background: "#0D1117",
            color: "#fff",
          });
          router.push("/work-space");
          window.dispatchEvent(new Event("notes-changed"));
        }
      } catch (error) {
        toast.error("Failed to delete");
      }
    }
  };

  // 5. Unlock Logic
  const handleUnlock = (unlockPassword, e) => {
    e.preventDefault();
    if (unlockPassword === password) {
      setIsLocked(false);
      toast.success("Vault Unlocked!");
    } else {
      toast.error("Incorrect Password!");
    }
  };

  // Return everything needed by the UI
  return {
    states: {
      isLoading,
      isSaving,
      syncStatus,
      isLocked,
      title,
      content,
      isPrivate,
      password,
      tags,
      updatedAt,
    },
    setters: {
      setTitle,
      setContent,
      setIsPrivate,
      setPassword,
      setTags,
      setIsLocked,
    },
    actions: { handleSave, handleDelete, handleUnlock },
  };
}
