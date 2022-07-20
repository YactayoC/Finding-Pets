import { useState, FormEvent } from "react";

import style from "./style.module.css";
import type { EditableFieldProps } from "components/EditableField/types";

export default function EditableField({
  value,
  onCancel,
  icon,
  onConfirm,
  ...props
}: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const containerStyles = `${style.container} ${isEditing && style.isEditing} ${
    loading && style.loading
  }`;

  const enabledEditing = () => {
    setIsEditing(true);
  };
  const disabledEditing = () => {
    setIsEditing(false);
  };

  const handleCancelButton = () => {
    onCancel && onCancel();
    disabledEditing();
  };

  const onConfirmEdit = (
    event: FormEvent<HTMLFormElement> & {
      target: { inputValue: HTMLInputElement };
    }
  ) => {
    event.preventDefault();
    const { value } = event.target.inputValue;
    if (value.trim() === "") return;

    setLoading(true);
    onConfirm(value)
      .then(() => {
        setNewValue(value);
      })
      .catch(() => {
        setNewValue(null);
        setError("Error al guardar los cambios");
        setTimeout(() => {
          setError(null);
        }, 4000);
      })
      .finally(() => {
        setLoading(false);
        disabledEditing();
      });
  };

  return (
    <form className={containerStyles} onSubmit={onConfirmEdit}>
      <span className={style.icon}>{icon && icon}</span>
      {isEditing ? (
        <input
          name="inputValue"
          className={style.input}
          defaultValue={newValue || value}
          {...props}
          required
        />
      ) : (
        <p className={style.input}>{newValue || value}</p>
      )}
      <div className={style.options}>
        {!isEditing && (
          <button className={style.edit_button} onClick={enabledEditing}>
            <i className="fa-solid fa-pen"></i>
          </button>
        )}
        {isEditing && (
          <>
            <button className={style.confirm_button} type="submit">
              <i className="fa-solid fa-check"></i>
            </button>
            <button
              className={style.cancel_button}
              onClick={handleCancelButton}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </>
        )}
      </div>
      {error && <p className={style.error}>{error}</p>}
    </form>
  );
}
