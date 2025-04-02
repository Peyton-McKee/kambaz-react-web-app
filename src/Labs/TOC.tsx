import { Nav } from "react-bootstrap";
import { useLocation } from "react-router";

export default function TOC() {
  const { pathname } = useLocation();
  const labs = [1, 2, 3, 4, 5];

  return (
    <Nav variant="pills">
      {labs.map((lab) => (
        <Nav.Item>
          <Nav.Link
            href={`#/Labs/Lab${lab}`}
            active={pathname.includes(`Lab${lab}`)}
          >
            Lab {lab}
          </Nav.Link>
        </Nav.Item>
      ))}
      <Nav.Item>
        <Nav.Link href="#/Kambaz">Kambaz</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          id="wd-github"
          href="https://github.com/Peyton-McKee/kambaz-react-web-app"
        >
          My GitHub
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
