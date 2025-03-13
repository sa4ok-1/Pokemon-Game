import logo from '../assets/logo.svg';

export const Logo = () => {
    return (
      <div className="absolute top-2 left-24 w-32 h-32 object-contain transition-all duration-500 ease-in-out hover:scale-110">
        <img
          src={logo}
          alt="Logo"
           className="w-32 h-32 "
        />
      </div>
    );
};
