import React, { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import type { MovieDialogProps } from "../../types";

interface ExtendedMovieDialogProps extends MovieDialogProps {
  selectedMovieIndex?: number;
  columnsPerRow?: number;
}

const MovieDialog: React.FC<ExtendedMovieDialogProps> = ({
  movie,
  isOpen,
  onClose,
  onMoreInfo,
  selectedMovieIndex = 0,
  columnsPerRow = 5,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      setIsAnimating(true);
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscape);
      };
    } else {
      setIsAnimating(false);
    }
  }, [isOpen, onClose]);

  if (!isOpen || !movie) return null;

  const handleMoreInfo = () => {
    onMoreInfo(movie);
  };

  const columnInRow = selectedMovieIndex % columnsPerRow;
  const pointerLeftPosition = `${
    (columnInRow / columnsPerRow) * 100 + 100 / columnsPerRow / 2
  }%`;

  return (
    <div className="col-span-full">
      <div
        className="flex justify-start relative"
        style={{ paddingLeft: "1.5rem" }}
      >
        <div
          className="transition-all duration-300 ease-out relative"
          style={{
            left: pointerLeftPosition,
            transform: `translateX(-50%) ${
              isAnimating
                ? "translateY(0) scale(1)"
                : "translateY(-10px) scale(0.8)"
            }`,
            opacity: isAnimating ? 1 : 0,
          }}
        >
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: "20px solid transparent",
              borderRight: "20px solid transparent",
              borderBottom: "20px solid #FFD700",
            }}
          />
        </div>
      </div>

      <div
        ref={dialogRef}
        className="relative mx-4 overflow-hidden shadow-2xl bg-gray-900 transition-all duration-500 ease-out transform"
        style={{
          border: "4px solid #FFD700",
          minHeight: "400px",
          transform: isAnimating
            ? "translateY(0) scale(1)"
            : "translateY(-20px) scale(0.95)",
          opacity: isAnimating ? 1 : 0,
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${
              movie.Poster !== "N/A" ? movie.Poster : "/api/placeholder/800/600"
            })`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 to-black/60" />
        </div>

        <div className="relative z-10 p-8 min-h-[400px] flex flex-col">
          <div className="mb-8">
            <div>
              <h1
                className="font-bold text-white mb-6 leading-tight"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "48px",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
                }}
              >
                {movie.Title}
              </h1>

              {movie.Plot && movie.Plot !== "N/A" && (
                <div className="mb-6">
                  <span className="text-white font-bold text-lg block mb-3">
                    Short Bio:
                  </span>
                  <p className="text-gray-300 text-base leading-relaxed">
                    {movie.Plot}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between items-start mt-auto">
            <div className="flex-1 max-w-xs flex flex-col h-full">
              <div className="mb-8">
                <span className="text-white font-bold text-xl block mb-3">
                  Rating
                </span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => {
                    const rating = parseFloat(movie.imdbRating || "0") / 2;
                    const isFilled = i < Math.floor(rating);
                    const isHalf =
                      i === Math.floor(rating) && rating % 1 >= 0.5;

                    return (
                      <Star
                        key={i}
                        className="w-8 h-8 text-primary"
                        style={{
                          fill: isFilled || isHalf ? "#FFD700" : "transparent",
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="mt-auto">
                <button
                  onClick={handleMoreInfo}
                  className="text-black px-12 py-3 font-bold text-base hover:opacity-90 transition-all duration-200 flex items-center gap-3 rounded mt-16 hover:scale-105"
                  style={{ background: "#FFD700" }}
                >
                  More Info
                </button>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-4 gap-x-8 gap-y-6 text-base">
              {movie.Genre && movie.Genre !== "N/A" && (
                <div>
                  <span className="text-white font-bold text-xl block mb-3">
                    Genre
                  </span>
                  <span className="bg-gray-600 text-white px-4 py-2 rounded text-sm font-semibold">
                    {movie.Genre.split(",")[0].trim()}
                  </span>
                </div>
              )}

              {movie.Released && movie.Released !== "N/A" && (
                <div>
                  <span className="text-white font-bold text-xl block mb-3">
                    Released
                  </span>
                  <span className="text-white text-base">{movie.Released}</span>
                </div>
              )}

              {movie.Director && movie.Director !== "N/A" && (
                <div>
                  <span className="text-white font-bold text-xl block mb-3">
                    Directors
                  </span>
                  <span className="text-white text-base">{movie.Director}</span>
                </div>
              )}

              {movie.Language && movie.Language !== "N/A" && (
                <div>
                  <span className="text-white font-bold text-xl block mb-3">
                    Language
                  </span>
                  <div className="flex gap-2 flex-wrap">
                    {movie.Language.split(",")
                      .slice(0, 2)
                      .map((lang, i) => (
                        <span
                          key={i}
                          className="bg-yellow-400 text-primary px-3 py-1 rounded text-sm font-bold"
                        >
                          {lang.trim()}
                        </span>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDialog;
