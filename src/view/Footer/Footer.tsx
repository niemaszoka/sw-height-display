import React, { PropsWithChildren } from "react";
export const Footer: React.FC<PropsWithChildren> = ({
    children,
}) => {
    return (
        <footer className="Footer">
            <div className="Footer__content">
                {children}
            </div>
        </footer>
    );
}