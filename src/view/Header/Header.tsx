import React, { PropsWithChildren } from "react";
export const Header: React.FC<PropsWithChildren> = ({
    children
}) => {
    return (
        <header className="Header">
            <div className="Header__content">
                {children}
            </div>
        </header>
    );
}