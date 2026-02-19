import React, { forwardRef, useMemo } from "react";

type ProfilePictureProps = {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  "aria-label"?: string;
};

/**
 * SOLO render del avatar. No maneja menús.
 * forwardRef para que el wrapper pueda ponerlo como referencia del Floating UI.
 */
const ProfilePicture = forwardRef<HTMLButtonElement, ProfilePictureProps>(
  ({ className = "", onClick, ...rest }, ref) => {
    const user = {
      nombres: "Juan Pérez",
      primer_apellido: "García",
    };

    const initials = useMemo(() => {
      const n = user?.nombres?.charAt(0) || "";
      const a = user?.primer_apellido?.charAt(0) || "";
      return (n + a).toUpperCase() || "U";
    }, [user?.nombres, user?.primer_apellido]);

    return (
      <button
        ref={ref}
        onClick={onClick}
        className={`w-10 h-10 rounded-full overflow-hidden bg-accent shadow-md flex items-center justify-center focus:outline-none ${className}`}
        {...rest}
      >
        <span className="text-white font-medium text-sm select-none">
          {initials}
        </span>
      </button>
    );
  },
);

ProfilePicture.displayName = "ProfilePicture";
export default ProfilePicture;
