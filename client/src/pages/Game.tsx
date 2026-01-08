import { useState, useEffect } from "react";
import BaseMain from "../components/base/BaseMain";
import Research from "../components/base/Research";
import FuelMain from "../components/fuel/FuelMain";
import MineMain from "../components/mine/MineMain";
import FarmMain from "../components/farm/FarmMain";
import Furnace from "../components/base/Furnace";
import Modal from "../components/Modal";
import { ToastProvider } from "../components/ui/toast/ToastProvider";

// Configuration for the heat system
const HEAT_DECAY_RATE = 2;
const DECAY_INTERVAL_MS = 10000;
const MAX_HEAT = 100;
const MIN_HEAT = 0;

const MODALS = {
  BASE: "base",
  RESEARCH: "research",
  FURNACE: "furnace",
  FUEL_MAIN: "fuelMain",
  MINE: "mine",
  FARM: "farm",
};

const Game = () => {
  const [heatLevel, setHeatLevel] = useState(50);
  const [activeModal, setActiveModal] = useState(MODALS.BASE);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setHeatLevel((prevHeatLevel) => {
        let newHeat = prevHeatLevel - HEAT_DECAY_RATE;

        newHeat = Math.max(MIN_HEAT, newHeat);

        return newHeat;
      });
    }, DECAY_INTERVAL_MS);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const closeModal = () => setActiveModal(MODALS.BASE);

  const openResearchModal = () => setActiveModal(MODALS.RESEARCH);

  const openFurnaceModal = () => setActiveModal(MODALS.FURNACE);

  const openFuelMainModal = () => setActiveModal(MODALS.FUEL_MAIN);
  const openMineModal = () => setActiveModal(MODALS.MINE);
  const openFarmModal = () => setActiveModal(MODALS.FARM);

  const renderModalContent = () => {
    switch (activeModal) {
      case MODALS.BASE:
        return (
          <ToastProvider>
            <BaseMain heatLevel={heatLevel} setHeatLevel={setHeatLevel} />
          </ToastProvider>
        );
      case MODALS.RESEARCH:
        return (
          <ToastProvider>
            <Research />
          </ToastProvider>
        );
      case MODALS.FURNACE:
        return (
          <ToastProvider>
            <Furnace />
          </ToastProvider>
        );
      case MODALS.FUEL_MAIN:
        return (
          <ToastProvider>
            <FuelMain heatLevel={heatLevel} setHeatLevel={setHeatLevel} />
          </ToastProvider>
        );
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
      <h1 className="text-white text-2xl font-bold p-2 bg-gray-400">PDuct</h1>
      <button
        className="text-white bg-gray-600 p-1 mr-1 rounded-lg"
        onClick={closeModal}
      >
        Base
      </button>
      <button
        className="text-white bg-gray-600 p-1 mr-1 rounded-lg"
        onClick={openResearchModal}
      >
        Research
      </button>
      <button
        className="text-white bg-gray-600 p-1 mr-1 rounded-lg"
        onClick={openFurnaceModal}
      >
        Furnace
      </button>
      <button
        className="text-white bg-gray-600 p-1 mr-1 rounded-lg"
        onClick={openFuelMainModal}
      >
        Fuel Main
      </button>
      <button
        className="text-white bg-gray-600 p-1 mr-1 rounded-lg"
        onClick={openMineModal}
      >
        Mine Main
      </button>
      <button
        className="text-white bg-gray-600 p-1 rounded-lg"
        onClick={openFarmModal}
      >
        Farm Main
      </button>
      <div className="items-center justify-center flex min-h-screen">
        {activeModal !== MODALS.BASE ? (
          <Modal>{renderModalContent()} </Modal>
        ) : (
          <ToastProvider>
            <BaseMain heatLevel={heatLevel} setHeatLevel={setHeatLevel} />
          </ToastProvider>
        )}
      </div>
    </div>
  );
};

export default Game;
