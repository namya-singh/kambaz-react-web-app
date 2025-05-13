export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <div id="wd-editor-navigation">
                <h2>A1 - ENV + HTML</h2>
            </div><br />

            <label htmlFor="wd-name">Assignment Name</label><br />
            <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />

            <label htmlFor="wd-description">Description</label><br />
            <textarea id="wd-description" rows={4}>
        The assignment is available online. Submit a link to the landing page of...
      </textarea><br /><br />

            <table>
                <tbody>
                <tr>
                    <td align="right"><label htmlFor="wd-points">Points</label></td>
                    <td><input id="wd-points" type="number" value={100} /></td>
                </tr>

                <tr>
                    <td align="right"><label htmlFor="wd-group">Assignment Group</label></td>
                    <td>
                        <select id="wd-group">
                            <option value="assignments">ASSIGNMENTS</option>
                            <option value="quizzes">QUIZZES</option>
                        </select>
                    </td>
                </tr>

                <tr>
                    <td align="right"><label htmlFor="wd-display-grade-as">Display Grade as</label></td>
                    <td>
                        <select id="wd-display-grade-as">
                            <option value="points">Points</option>
                            <option value="percent">Percentage</option>
                        </select>
                    </td>
                </tr>

                <tr>
                    <td align="right"><label htmlFor="wd-submission-type">Submission Type</label></td>
                    <td>
                        <select id="wd-submission-type">
                            <option value="online">Online</option>
                            <option value="onpaper">On Paper</option>
                        </select>
                        <div style={{ marginTop: "8px" }}>
                            <label>Online Entry Options</label><br />
                            <input type="checkbox" id="wd-text-entry" />
                            <label htmlFor="wd-text-entry"> Text Entry</label><br />

                            <input type="checkbox" id="wd-website-url" />
                            <label htmlFor="wd-website-url"> Website URL</label><br />

                            <input type="checkbox" id="wd-media-recordings" />
                            <label htmlFor="wd-media-recordings"> Media Recordings</label><br />

                            <input type="checkbox" id="wd-student-annotation" />
                            <label htmlFor="wd-student-annotation"> Student Annotation</label><br />

                            <input type="checkbox" id="wd-file-upload" />
                            <label htmlFor="wd-file-upload"> File Uploads</label>
                        </div>
                    </td>
                </tr>

                <tr>
                    <td align="right"><label htmlFor="wd-assign-to">Assign to</label></td>
                    <td>
                        <select id="wd-assign-to">
                            <option value="everyone">Everyone</option>
                        </select>
                    </td>
                </tr>

                <tr>
                    <td align="right"><label htmlFor="wd-due-date">Due</label></td>
                    <td><input type="date" id="wd-due-date" defaultValue="2025-05-20" /></td>
                </tr>

                <tr>
                    <td align="right"><label htmlFor="wd-available-from">Available from</label></td>
                    <td>
                        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                            <input type="date" id="wd-available-from" defaultValue="2025-05-01" />
                            <label htmlFor="wd-available-until">Until</label>
                            <input type="date" id="wd-available-until" defaultValue="2025-06-01" />
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>

            <div id="wd-editor-actions" style={{ marginTop: "16px" }}>
                <button id="wd-cancel-btn">Cancel</button>
                <button id="wd-save-btn">Save</button>
            </div>
        </div>
    );
}
