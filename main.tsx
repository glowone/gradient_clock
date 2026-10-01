import React, { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import clsx from "clsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<GradientClock />
	</StrictMode>
);

function GradientClock() {
    const [time, setTime] = useState<Date>(() => new Date());
	
    const getDigits = (value: number) => String(value).padStart(2, "0").split("");
    const hours: string[] = getDigits(time.getHours());
    const minutes: string[] = getDigits(time.getMinutes());
    const seconds: string[] = getDigits(time.getSeconds());
    const digitGroups: string[][] = [hours, minutes, seconds];
    const readableTime: string = time.toLocaleTimeString();

    useEffect(() => {
        const timer: number = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
		<div className="clock" aria-label={readableTime} aria-live="polite">
			{digitGroups.map((group, i) => {
				const groupIndex: string = `group-${i}`;

				return (
					<div key={groupIndex} className="clock__digit-group">
						{group.map((digit, j) => {
							const digitIndex: string = `digit-${i}-${j}`;

							return (
								<div
									key={digitIndex}
									className={clsx(
										"clock__digit",
										`clock__digit--${digit}`
									)}
								/>
							);
						})}
					</div>
				);
			})}
		</div>
    );
}