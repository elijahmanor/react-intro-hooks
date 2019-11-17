function Character({
  type = "",
  size = 1,
  color = "black",
  top = 0,
  left = 0,
  rotate = 0
}) {
  return (
    <i
      className={`Character swg swg-${type}`}
      style={{
        position: "absolute",
        top,
        left,
        color,
        fontSize: `${size}rem`,
        transform: `rotate(${rotate}deg)`
      }}
    />
  );
}

const getRandom = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const icons = ["yoda", "darthvader", "wookie", "falcon", "leia"];
console.log(icons[getRandom(0, icons.length - 1)]);
console.log(getRandom(0, icons.length - 1));
const characters = [...Array(101)].map((_, i) => {
  const props = {
    // type: !!Math.round(Math.random()) ? 'yoda' : 'darthvader',
    type: icons[getRandom(0, icons.length - 1)],
    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    size: getRandom(1, 10),
    top: `${getRandom(0, 100)}%`,
    left: `${getRandom(0, 100)}%`,
    rotate: getRandom(0, 360)
  };
  return <Character key={i} {...props} />;
});

render(<main>{characters}</main>);
