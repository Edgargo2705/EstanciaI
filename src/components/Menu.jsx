

function Menu(){
    return (
      <div>
        <input
          className="menu-icon"
          type="checkbox"
          id="menu-icon"
          name="menu-icon"
        />
        <label htmlFor="menu-icon"></label>
        <nav className="nav">
          <ul className="pt-5">
            <li>
              <a href="/Atencion">Atencion</a>
            </li>
            <li>
              <a href="/home">Tutorados</a>
            </li>
          
          </ul>
        </nav>
      </div>
    );
}

export default Menu;