import React, { useState, useEffect } from "react";
import houses from "../data/houses"; // JSON veya Array verisi
import House from "./House";

const ProgressBar = ({ current, total }) => {
  const progressPercentage = (current / total) * 100;

  return (
    <div className="lg:w-full bg-gray-200 lg:rounded-3xl rounded-lg lg:h-3 overflow-hidden lg:mb-2 mb-1 h-2 w-full">
      <div
        className="bg-blue-600 lg:h-full h-full"
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  );
};

// Array'i karıştıran bir fonksiyon
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Game = () => {
  const [shuffledHouses, setShuffledHouses] = useState([]); // Karıştırılmış evler
  const [currentHouse, setCurrentHouse] = useState(0); // Hangi ev gösteriliyor
  const [guessedRent, setGuessedRent] = useState(""); // Kullanıcının tahmin ettiği kira
  const [remainingAttempts, setRemainingAttempts] = useState(5); // Kalan hak
  const [message, setMessage] = useState(""); // Tahmin sonucu mesajı
  const [gameOver, setGameOver] = useState(false); // Tüm evler bitti mi?

  useEffect(() => {
      // Evleri karıştır ve yalnızca 8 tanesini seç
    setShuffledHouses(shuffleArray(houses).slice(0, 6));
  }, []);

  const houseData = shuffledHouses[currentHouse]; // Mevcut evin verileri

  const handleGuess = () => {
    const actualRent = houseData.rent; // array dosyasından çekilen evin kirası

    if (parseInt(guessedRent) < actualRent) {
      setMessage(
        <p className="text-red-600 lg:font-bold bg-yellow-100 lg:text-xl lg:px-4 lg:py-2 font-medium text-lg p-1 rounded-lg shadow-md">
          Kira girdiğiniz değerden daha yüksek, tekrar deneyiniz.
        </p>
      );
    } else if (parseInt(guessedRent) > actualRent) {
      setMessage(
        <p className="text-blue-600 lg:font-bold lg:text-xl bg-blue-100 lg:px-4 lg:py-2 font-medium text-lg p-1 rounded-lg shadow-md">
          Kira girdiğiniz değerden daha düşük, tekrar deneyiniz.
        </p>
      );
    } else {
      setMessage(
        <p className="text-green-600 lg:font-bold lg:text-xl bg-green-100 lg:px-4 lg:py-2 font-medium text-lg p-1 rounded-lg shadow-md">
          Tebrikler! Tahmininiz doğru.{" "}
          {currentHouse === shuffledHouses.length - 1
            ? "Oyun bitti, tüm evleri tahmin ettiniz 🎉"
            : "Bir sonraki eve geçiliyor..."}
        </p>
      );

      if (currentHouse === shuffledHouses.length - 1) {
        setGameOver(true); // Oyun bitti
      } else {
        setTimeout(() => {
          handleNextHouse();
        }, 3000);
      }
      return;
    }

    setRemainingAttempts(remainingAttempts - 1);

    if (remainingAttempts <= 1) {
      setMessage(
        <p className="text-red-600 bg-red-100 px-4 py-2 text-lg rounded-lg shadow-md">
          Oyunu kaybettiniz! Daha fazla hakkınız yok.
          <br />
          Bu evin kira bedeli:{" "}
          <span className="text-blue-600 text-2xl font-bold">
            ₺{actualRent.toLocaleString()}
          </span>
        </p>
      );
    }

    setGuessedRent(""); // Inputu sıfırla
  };

  const handleNextHouse = () => {
    if (currentHouse < shuffledHouses.length - 1) {
      setCurrentHouse(currentHouse + 1); // Bir sonraki eve geç
      setRemainingAttempts(5); // Hakkı sıfırla
      setMessage(""); // Mesajı sıfırla
      setGuessedRent(""); // Input'u sıfırla
    } else {
      setGameOver(true); // Tüm evler bitti
    }
  };

  return (
    <div className="flex flex-col gap-6 p-2">
      {!gameOver ? (
        <>
          {/* ProgressBar */}
          <ProgressBar current={currentHouse} total={shuffledHouses.length} />

          {/* Mevcut Ev */}
          {houseData && <House {...houseData} />}

          {remainingAttempts > 0 ? (
            <div className="flex flex-row gap-2 items-center justify-center">
              <input
                type="number"
                value={guessedRent}
                onChange={(e) => setGuessedRent(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && guessedRent) {
                    handleGuess();
                  }
                }}
                placeholder="₺ 0 Tahmininizi girin"
                step="2500"
                className="w-64 px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
              <button
                onClick={handleGuess}
                disabled={!guessedRent} // Butonun aktifliğini kontrol ediyoruz
                className={`tahmin_btn px-1 sm:px-3 md:px-6 py-2 md:text-lg font-semibold rounded-lg shadow-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  guessedRent
                    ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400"
                    : "bg-gray-500 text-white cursor-not-allowed"
                }`}
              >
                Tahmin Et 
              </button>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-red-700 text-xl font-medium">
                Tahmin hakkınız bitti! Sonraki eve geçmek için butona tıklayın.
              </p>
              <button
                onClick={handleNextHouse}
                className="next_btn px-6 py-2 mt-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
              >
                Sonraki Ev
              </button>
            </div>
          )}

          <p className="text-xl font-semibold text-white px-4 py-2 rounded-lg">
            Kaç hak kaldı: {remainingAttempts}
          </p>

          <p>{message}</p>
        </>
      ) : (
        <div className="flex justify-center items-center h-screen">
  <p className="text-center text-2xl text-white font-bold">
    Tüm evleri tahmin ettiniz! Oyun bitti 🎉
  </p>
</div>
      )}
    </div>
  );
};

export default Game;
