import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

export default function PeopleTable() {
    return (
        <div id="wd-people-table">
            <Table striped>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Login ID</th>
                    <th>Section</th>
                    <th>Role</th>
                    <th>Last Activity</th>
                    <th>Total Activity</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="wd-full-name text-nowrap">
                        <FaUserCircle className="me-2 fs-1 text-secondary" />
                        <span className="wd-first-name">Tony</span>{" "}
                        <span className="wd-last-name">Stark</span>
                    </td>
                    <td className="wd-login-id">001234561S</td>
                    <td className="wd-section">S101</td>
                    <td className="wd-role">STUDENT</td>
                    <td className="wd-last-activity">2020-10-01</td>
                    <td className="wd-total-activity">10:21:32</td>
                </tr>
                <tr>
                    <td className="wd-full-name text-nowrap">
                        <FaUserCircle className="me-2 fs-1 text-secondary" />
                        <span className="wd-first-name">Rosy</span>{" "}
                        <span className="wd-last-name">Arora</span>
                    </td>
                    <td className="wd-login-id">002345672R</td>
                    <td className="wd-section">S102</td>
                    <td className="wd-role">STUDENT</td>
                    <td className="wd-last-activity">2020-10-03</td>
                    <td className="wd-total-activity">08:45:12</td>
                </tr>
                <tr>
                    <td className="wd-full-name text-nowrap">
                        <FaUserCircle className="me-2 fs-1 text-secondary" />
                        <span className="wd-first-name">Navdeep</span>{" "}
                        <span className="wd-last-name">Singh</span>
                    </td>
                    <td className="wd-login-id">003456783N</td>
                    <td className="wd-section">S103</td>
                    <td className="wd-role">STUDENT</td>
                    <td className="wd-last-activity">2020-10-05</td>
                    <td className="wd-total-activity">12:30:15</td>
                </tr>
                <tr>
                    <td className="wd-full-name text-nowrap">
                        <FaUserCircle className="me-2 fs-1 text-secondary" />
                        <span className="wd-first-name">Aryan</span>{" "}
                        <span className="wd-last-name">Aurora</span>
                    </td>
                    <td className="wd-login-id">004567894A</td>
                    <td className="wd-section">S104</td>
                    <td className="wd-role">STUDENT</td>
                    <td className="wd-last-activity">2020-10-07</td>
                    <td className="wd-total-activity">09:15:42</td>
                </tr>
                <tr>
                    <td className="wd-full-name text-nowrap">
                        <FaUserCircle className="me-2 fs-1 text-secondary" />
                        <span className="wd-first-name">Kshitij</span>{" "}
                        <span className="wd-last-name">Tanwar</span>
                    </td>
                    <td className="wd-login-id">005678905K</td>
                    <td className="wd-section">S105</td>
                    <td className="wd-role">STUDENT</td>
                    <td className="wd-last-activity">2020-10-09</td>
                    <td className="wd-total-activity">07:50:27</td>
                </tr>
                </tbody>
            </Table>
        </div>
    );
}
