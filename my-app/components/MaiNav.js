import Button from 'react-bootstrap/Button';
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
// A5 Step 6
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';


export default function MainNav() {

    // to navigate to the desired page
    const router = useRouter();
    const [searchField, setSearchField] = useState('')

    // A5 Step 2
    const [isExpanded, setIsExtended] = useState(false)

    // A5 Step 6
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)

    function submitForm(e){
        e.preventDefault()
        router.push(`/artwork?title=true&q=${searchField}`)
        setSearchField('') // followed the sample solution
    // A5 Step 2
        setIsExtended(false)

    // A5 Step 6
        setSearchHistory(current => [...current, `title=true&q=${searchField}`]);
    }

  return (
    <>
      <Navbar className="fixed-top navbar-dark bg-primary" expand="lg" expanded={isExpanded}>
        <Container>
          <Navbar.Brand>Koji Saeki</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={()=> setIsExtended(!isExpanded)} /**A5 Step 2 */ /> 
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" legacyBehavior passHref >
                <Nav.Link onClick={()=> setIsExtended(false)} /**A5 Step 2 */ active={router.pathname === "/"} /** A5 Step 9 */>Home</Nav.Link>
              </Link>
              <Link href="/search" legacyBehavior passHref >
                <Nav.Link onClick={()=> setIsExtended(false)} /**A5 Step 2 */ active={router.pathname === "/search"} /** A5 Step 9 */>Advanced Search</Nav.Link>
              </Link>
            </Nav>
            &nbsp; 
            <Form className="d-flex" onSubmit={submitForm}>
            <Form.Control
              value={searchField}
              onChange={(e)=> setSearchField(e.target.value)}
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button type="submit" variant="success" disabled={!searchField}>Search</Button>
          </Form>
          &nbsp;
          {/* A5 Step 5 */}
          <Nav>
          <NavDropdown title="User Name" id="basic-nav-dropdown" >
            <Link href="/favourites" legacyBehavior passHref  /**active={router.pathname === "/favourites" || router.pathname ==="/history" } */>
              <NavDropdown.Item onClick={()=> setIsExtended(false)} active={router.pathname === "/favourites"} /** A5 Step 9 */ >Favourites</NavDropdown.Item>
              </Link>
              <Link href="/history" legacyBehavior passHref >
              <NavDropdown.Item onClick={()=> setIsExtended(false)} active={router.pathname === "/history"} /** A5 Step 9 */ >Search History</NavDropdown.Item>
              </Link>
            </NavDropdown>

          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br /><br /><br />   
    </>
  );
}
