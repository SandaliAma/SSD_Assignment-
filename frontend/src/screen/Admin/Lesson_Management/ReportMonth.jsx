import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ReportMonth.css";

function ReportMonth() {
    const [selectedMonth, setSelectedMonth] = useState(""); // Initialize with an empty string
    const [isValid, setIsValid] = useState(true); // State to track validity

    useEffect(() => {
        // Get the current date
        const currentDate = new Date();
        // Format the current month as YYYY-MM
        const currentMonth = currentDate.toISOString().slice(0, 7);
        // Set the selected month to the current month
        setSelectedMonth(currentMonth);
    }, []); // Run only once when the component mounts

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
        // Check if a month is selected and set isValid accordingly
        setIsValid(event.target.value !== "");
    };

    const handleSubmit = (event) => {
        if (!isValid) {
            // If the form is not valid, prevent default submit behavior
            event.preventDefault();
        }
    };

    return (
        <div>
            <div className="containergrl">
                <h1 className="h1grl">Generate Monthly Report</h1>
                <br /><br />
                <form className="paygrl" onSubmit={handleSubmit} noValidate>
                    <div className="form-groupgr">
                        <label htmlFor="from" className="label1grl">
                            Select Month:
                        </label>
                        <input
                            type="month"
                            id="from"
                            name="from"
                            className={`text1gr ${isValid ? "" : "invalid"}`}
                            value={selectedMonth}
                            onChange={handleMonthChange}
                            required
                        />
                        {!isValid && <div className="invalid-feedback">Please select a valid month.</div>}
                    </div>
                    <Link to={`/lessonReport?month=${selectedMonth}`}>
                        <button type="submit" className="button7grl">Generate</button>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default ReportMonth;
