import React, { useState, useEffect } from "react";
import BaseMain from "../components/base/BaseMain";
import FuelMain from "../components/fuel/FuelMain";
import MineMain from "../components/mine/MineMain";
import FarmMain from "../components/farm/FarmMain";
import Modal from "../components/Modal";

const MODALS = {
  BASE: "base",
  FUEL_MAIN: "fuelMain",
  MINE: "mine",
  FARM: "farm",
};

const Game = () => {
  const [heat, setHeat] = useState(0);

  useEffect(() => {
    setHeat((prev) => prev + 1);
  }, []);

  const [activeModal, setActiveModal] = useState(MODALS.BASE);

  const closeModal = () => setActiveModal(MODALS.BASE);

  const openFuelMainModal = () => setActiveModal(MODALS.FUEL_MAIN);
  const openMineModal = () => setActiveModal(MODALS.MINE);
  const openFarmModal = () => setActiveModal(MODALS.FARM);

  const renderModalContent = () => {
    switch (activeModal) {
      case MODALS.BASE:
        return <BaseMain />;
      case MODALS.FUEL_MAIN:
        return <FuelMain />;
      case MODALS.MINE:
        return <MineMain />;
      case MODALS.FARM:
        return <FarmMain />;
      default:
        return null;
    }
  };
  return (
    <div>
      <h1 className="text-2xl font-bold p-2 bg-gray-400">PDuct</h1>
      <button className="bg-gray-600 p-1 mr-1 rounded-lg" onClick={closeModal}>
        Base
      </button>
      <button
        className="bg-gray-600 p-1 mr-1 rounded-lg"
        onClick={openFuelMainModal}
      >
        Fuel Main
      </button>
      <button
        className="bg-gray-600 p-1 mr-1 rounded-lg"
        onClick={openMineModal}
      >
        Mine Main
      </button>
      <button className="bg-gray-600 p-1 rounded-lg" onClick={openFarmModal}>
        Farm Main
      </button>

      <div className="items-center justify-center flex min-h-screen">
        {activeModal !== MODALS.BASE ? (
          <Modal>{renderModalContent()} </Modal>
        ) : (
          <BaseMain />
        )}
      </div>
    </div>
  );
};

export default Game;
