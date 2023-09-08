import React, { useState } from "react";
import "./App.css";
import { DndContext } from "@dnd-kit/core";
import Draggable from "./Draggable";
import Droppable from "./Droppable";

function App() {
  const containers = ["Apple", "Banana", "Orange", "Carrot", "Leek", "Cucumber", "Grapes", "Beetroot"];
  const [parent, setParent] = useState(null);

  type Item = {
    [item: string]: {
      text: string;
      image: string;
    };
  };

  const fruitAndVegMap: Item = {
    Apple: {
      text: "An APPLE is a FRUIT that grows on a tree.",
      image: "https://ik.imagekit.io/dgmfafxequ/tr:w-100,h-100/apple_2sc4OVhJr.png",
    },
    Banana: {
      text: "A BANANA is a FRUIT that grows on a tree.",
      image: "https://ik.imagekit.io/dgmfafxequ/tr:w-100,h-100/banana_2xMVAvnAL.png",
    },
    Orange: {
      text: "An ORANGE is a FRUIT that grows on a tree.",
      image:
        "https://ik.imagekit.io/dgmfafxequ/tr:w-100,h-100/orange_gc6BBxQPu.png",
    },
    Carrot: {
      text: "A CARROT is a VEGETABLE that grows in the soil, and even UNDERGROUND!",
      image:
        "https://ik.imagekit.io/dgmfafxequ/tr:w-100,h-100/carrot_JcFnQyxY1.png",
    },
    Leek: {
      text: "A LEEK is a VEGETABLE that grows in the soil.",
      image:
        "https://ik.imagekit.io/dgmfafxequ/tr:w-100,h-100/leek_xBGqwRY64.png",
    },
    Cucumber: {
      text: "A CUCUMBER is a VEGETABLE that grows on a vine.",
      image:
        "https://ik.imagekit.io/dgmfafxequ/tr:w-100,h-100/cucumber_nmhSw09Jm.png",
    },
    Grapes: {
      text: "GRAPES are a FRUIT that grows on a vine. They grow in bunches!",
      image:
        "https://ik.imagekit.io/dgmfafxequ/tr:w-100,h-100/grapes_506GpfkBl.png",
    },
    Beetroot: {
      text: "A BEETROOT is a VEGETABLE that grows in the soil, and even UNDERGROUND!",
      image:
        "https://ik.imagekit.io/dgmfafxequ/tr:w-100,h-100/beetroot_Kn1Hw6vCH.png",
    },
  };

  function handleDragEnd(event: any) {
    const { over, active } = event;
    setParent(over ? active.id : null);
  }

  const draggableMarkup = (id: string) => (
    <Draggable id={id}>
      <img className="app__skillLogo" src={fruitAndVegMap[id].image} alt="" />
    </Draggable>
  );

  return (
    <div className="app">
      <DndContext onDragEnd={handleDragEnd}>
        <div className="app__items">
          {containers.map((id) => (id !== parent ? draggableMarkup(id) : null))}
        </div>
        {parent ? (
          <h3 className="app__instruction">
            Drag the pictures to the box below to learn more about them!
          </h3>
        ) : null}

        <Droppable key={"abcdef"} id={"abcdef"}>
          {parent === null ? (
            <div className="app__infoBox app__infoBox--inactive">
              <h3>Click & Drag a picture here to display more info...</h3>
            </div>
          ) : (
            <div className="app__infoBox">
              <img
                className="app__picture"
                src={fruitAndVegMap[parent!].image}
                alt=""
              />
              <h1>{parent}</h1>
              <h3>{fruitAndVegMap[parent!].text}</h3>
            </div>
          )}
        </Droppable>
      </DndContext>
    </div>
  );
}

export default App;
