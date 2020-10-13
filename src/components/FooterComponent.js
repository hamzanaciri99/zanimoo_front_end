import React from 'react';
import { Facebook, Instagram, Mail } from 'react-feather';
import '../stylesheets/Footer.css';

function Footer(props) {
  return (
    <div className="footer row">
      <div className="col">
        <p>&nbsp;&nbsp;&nbsp;This website was done under the command of DIO
           as his first step to rule the world of anime (I too don't know how!)
           <br />&nbsp;&nbsp;&nbsp;Therefore, this website has the ability to use ZA WARUDO in order 
           to stop time for you which let you finish your favourite 
           animes in no time! </p>
      </div>
      <div className="col">
        <blockquote className="blockquote text-center">
          <p>"It's me DIO and I love lasagna"</p>
          <footer className="blockquote-footer">Definitely not <cite title="Source Title">DIO</cite></footer>
        </blockquote>
      </div>
      <div>
        <h5>Do you face a problem? Contact us on:</h5>
        <ul style={{listStyle: 'none'}}>
          <li>
            <a target="_blank" rel="noopener noreferrer" href="https://bit.ly/374p03w">
              <Facebook />
              <p>Facebook</p>
            </a>
          </li>
          <li>
            <a target="_blank" rel="noopener noreferrer" href="https://bit.ly/374p03w">
              <Instagram />
              <p>Instagram</p>
            </a>
          </li>
          <li>
            <a target="_blank" rel="noopener noreferrer" href="https://bit.ly/374p03w">
              <Mail />
              <p>E-Mail</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
