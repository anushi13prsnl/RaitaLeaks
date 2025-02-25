// import { ReactComponent as Logo } from "./logo.svg"; // Adjust path as needed



// const XSvg = (props) => (
// 	// <svg aria-hidden='true' viewBox='0 0 24 24' {...props}>
// 	// 	<path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
// 	// </svg>
// 	<Logo width={100} height={100} fill="blue" />
// );
// export default XSvg;

import logo from "./logo.svg"; // Import as an image

const XSvg = (props) => (
	<img src={logo} width={1300} height={1300} alt="Logo" {...props} />
);

export default XSvg;



