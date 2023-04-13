const Topbar: React.FC = () => {
  return (
    <nav className="bg-white h-28 px-6 flex items-center justify-center text-center text-xl rounded-t-lg w-full">
      <p>
        Press the sequence shown in a block to change it's background color. The
        triggers are sequence-sensitive. Click on a block again to deselect it.
      </p>
    </nav>
  );
};

export default Topbar;
