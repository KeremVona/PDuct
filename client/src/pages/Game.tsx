import React, { useState } from "react";
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
  const [activeModal, setActiveModal] = useState(MODALS.BASE);

  const closeModal = () => setActiveModal(MODALS.BASE);

  const openFuelMainModal = () => setActiveModal(MODALS.FUEL_MAIN);
  const openMineModal = () => setActiveModal(MODALS.MINE);
  const openFarmModal = () => setActiveModal(MODALS.FARM);

  // 3. Helper function to render the correct modal content
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
      <button onClick={openFuelMainModal}>Fuel Main</button>
      <button onClick={openMineModal}>Mine Main</button>
      <button onClick={openFarmModal}>Farm Main</button>

      <div className="items-center justify-center flex min-h-screen">
        <div className="items-center justify-center flex border-white border-2 p-2 bg-gray-500 border-solid w-250 h-140">
          {activeModal !== MODALS.BASE && (
            <Modal onClose={closeModal}>{renderModalContent()} </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;
