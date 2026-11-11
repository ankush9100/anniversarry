import {
  useEffect,
  useState,
  type PointerEvent as ReactPointerEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import Scene3D from "./Scene3D";
import {
  Heart,
  Music2,
  VolumeX,
  Sparkles,
  Stars,
  Gift,
  Infinity as InfinityIcon,
  ArrowDown,
  PartyPopper,
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { createLoveSong } from "./music";

// ----------------------------------
// DATA
// ----------------------------------

const reasons = [
  "Because your smile can turn an ordinary day into my favourite day.",
  "Because even your silly little moods are part of the person I adore.",
  "Because you make the word 'home' feel like a person.",
  "Because laughing with you is one of my favourite things.",
  "Because I still get excited knowing I get to call you my wife.",
  "Because life feels warmer when I imagine telling you everything.",
  "Because you are my favourite hello and my hardest goodbye.",
  "Because, Muchchu, you are simply you — and that is my favourite reason.",
];

const promises = [
  "I promise to keep choosing you, especially on the ordinary days.",
  "I promise to listen, not just hear.",
  "I promise to make room for laughter, even when life gets busy.",
  "I promise to keep dating you, surprising you and learning you.",
  "I promise that distance will never make you feel less loved.",
  "I promise to build a life where we both feel safe, seen and celebrated.",
];

// const memoryPhotos = [
//   "/memories/IMG-20251215-WA0006.jpg",
//   "/memories/IMG-20251215-WA0025.jpg",
//   "/memories/IMG-20251215-WA0027.jpg",
//   "/memories/IMG-20251215-WA0032.jpg",
//   "/memories/IMG-20251215-WA0047.jpg",
//   "/memories/IMG-20260121-WA0000.jpg",
//   "/memories/IMG-20260121-WA0006.jpg",
//   "/memories/IMG-20260121-WA0007.jpg",
//   "/memories/IMG-20260121-WA0008.jpg",
//   "/memories/IMG-20260121-WA0009.jpg",
//   "/memories/IMG-20260121-WA0010.jpg",
//   "/memories/IMG-20260207-WA0036.jpg",
//   "/memories/IMG-20260207-WA0037.jpg",
//   "/memories/IMG-20260207-WA0038.jpg",
//   "/memories/IMG-20260207-WA0044.jpg",
//   "/memories/IMG-20260207-WA0046.jpg",
//   "/memories/IMG-20260207-WA0050.jpg",
//   "/memories/IMG-20260207-WA0051.jpg",
//   "/memories/IMG-20260222-WA0099.jpg",
//   "/memories/IMG-20260222-WA0100.jpg",
//   "/memories/IMG-20260222-WA0101.jpg",
//   "/memories/IMG-20260222-WA0102.jpg",
//   "/memories/IMG-20260222-WA0103.jpg",
//   "/memories/IMG-20260222-WA0104.jpg",
//   "/memories/IMG-20260222-WA0105.jpg",
//   "/memories/IMG-20260503-WA0034.jpg",
//   "/memories/IMG-20260503-WA0035.jpg",
//   "/memories/IMG-20260503-WA0036.jpg",
//   "/memories/IMG-20260503-WA0041.jpg",
//   "/memories/IMG-20260503-WA0042.jpg",
//   "/memories/IMG-20260503-WA0043.jpg",
//   "/memories/IMG-20260503-WA0044.jpg",
//   "/memories/IMG-20260503-WA0045.jpg",
//   "/memories/IMG-20260503-WA0046.jpg",
//   "/memories/IMG-20260503-WA0047.jpg",
//   "/memories/IMG-20260503-WA0048.jpg",
//   "/memories/IMG-20260503-WA0049.jpg",
//   "/memories/IMG-20260626-WA0030.jpg",
//   "/memories/IMG-20260626-WA0031.jpg",
//   "/memories/IMG-20260626-WA0032.jpg",
//   "/memories/IMG-20260626-WA0034.jpg",
//   "/memories/IMG-20260702-WA0000.jpg",
//   "/memories/IMG-20260702-WA0001.jpg",
//   "/memories/IMG-20260702-WA0013.jpg",
//   "/memories/IMG-20260702-WA0014.jpg",
//   "/memories/IMG-20260702-WA0025.jpg",
//   "/memories/IMG-20260702-WA0026.jpg",
//   "/memories/IMG-20260702-WA0027.jpg",
//   "/memories/IMG-20260702-WA0056.jpg",
//   "/memories/IMG-20260810-WA0014.jpg",
//   "/memories/IMG-20260810-WA0015.jpg",
//   "/memories/IMG-20260810-WA0016.jpg",
//   "/memories/IMG-20260810-WA0017.jpg",
//   "/memories/IMG-20261003-WA0008.jpg",
//   "/memories/IMG-20261003-WA0010.jpg",
//   "/memories/IMG-20261003-WA0011.jpg",
//   "/memories/IMG-20261015-WA0025.jpg",
//   "/memories/IMG-20261016-WA0007.jpg",
//   "/memories/IMG-20261020-WA0064.jpg",
//   "/memories/IMG-20261104-WA0000.jpg",
//   "/memories/IMG-20261104-WA0001.jpg",
//   "/memories/IMG-20261104-WA0002.jpg",
//   "/memories/IMG-20261105-WA0028.jpg",
//   "/memories/IMG-20261105-WA0032.jpg",
//   "/memories/IMG-20261105-WA0034.jpg",
//   "/memories/IMG-20261105-WA0044.jpg",
//   "/memories/IMG-20261105-WA0045.jpg",
//   "/memories/IMG-20261105-WA0046.jpg",
//   "/memories/IMG-20261105-WA0047.jpg",
//   "/memories/IMG-20261105-WA0048.jpg",
//   "/memories/IMG-20261105-WA0049.jpg",
//   "/memories/IMG-20261105-WA0050.jpg",
//   "/memories/IMG-20261105-WA0051.jpg",
//   "/memories/IMG-20261105-WA0052.jpg",
//   "/memories/IMG-20261105-WA0053.jpg",
//   "/memories/IMG-20261105-WA0054.jpg",
//   "/memories/IMG-20261105-WA0068.jpg",
//   "/memories/IMG-20261105-WA0079.jpg",
//   "/memories/IMG-20261109-WA0046.jpg",
//   "/memories/IMG-20261110-WA0003.jpg",
//   "/memories/IMG-20261110-WA0004.jpg",
//   "/memories/IMG20260113221717.jpg",
//   "/memories/IMG20260113221808.jpg",
//   "/memories/IMG20260113221830.jpg",
//   "/memories/IMG20260113221858.jpg",
//   "/memories/IMG20260503194329.jpg",
//   "/memories/IMG20260503194400.jpg",
//   "/memories/IMG20260503194401.jpg",
//   "/memories/IMG20260503194449.jpg",
//   "/memories/IMG20260503194451.jpg",
//   "/memories/IMG20260503194452.jpg",
//   "/memories/IMG20260503194453.jpg",
//   "/memories/IMG20260503194629.jpg",
//   "/memories/IMG20260503194634.jpg",
//   "/memories/IMG20260503194636.jpg",
//   "/memories/IMG20260627125655.jpg",
//   "/memories/IMG20260627125733.jpg",
//   "/memories/IMG20261008202643.jpg",
//   "/memories/IMG20261008202804.jpg",
//   "/memories/IMG20261011212242.jpg",
// ];

const memoryPhotos = [
  "/memories/memory-001.jpg",
  "/memories/memory-002.jpg",
  "/memories/memory-003.jpg",
  "/memories/memory-004.jpg",
  "/memories/memory-005.jpg",
  "/memories/memory-006.jpg",
  "/memories/memory-007.jpg",
  "/memories/memory-008.jpg",
  "/memories/memory-009.jpg",
  "/memories/memory-010.jpg",
  "/memories/memory-011.jpg",
  "/memories/memory-012.jpg",
  "/memories/memory-013.jpg",
  "/memories/memory-014.jpg",
  "/memories/memory-015.jpg",
  "/memories/memory-016.jpg",
  "/memories/memory-017.jpg",
  "/memories/memory-018.jpg",
  "/memories/memory-019.jpg",
  "/memories/memory-020.jpg",
  "/memories/memory-021.jpg",
  "/memories/memory-022.jpg",
  "/memories/memory-023.jpg",
  "/memories/memory-024.jpg",
  "/memories/memory-025.jpg",
  "/memories/memory-026.jpg",
  "/memories/memory-027.jpg",
  "/memories/memory-028.jpg",
  "/memories/memory-029.jpg",
  "/memories/memory-030.jpg",
  "/memories/memory-031.jpg",
  "/memories/memory-032.jpg",
  "/memories/memory-033.jpg",
  "/memories/memory-034.jpg",
  "/memories/memory-035.jpg",
  "/memories/memory-036.jpg",
  "/memories/memory-037.jpg",
  "/memories/memory-038.jpg",
  "/memories/memory-039.jpg",
  "/memories/memory-040.jpg",
  "/memories/memory-041.jpg",
  "/memories/memory-042.jpg",
  "/memories/memory-043.jpg",
  "/memories/memory-044.jpg",
  "/memories/memory-045.jpg",
  "/memories/memory-046.jpg",
  "/memories/memory-047.jpg",
  "/memories/memory-048.jpg",
  "/memories/memory-049.jpg",
  "/memories/memory-050.jpg",
  "/memories/memory-051.jpg",
  "/memories/memory-052.jpg",
  "/memories/memory-053.jpg",
  "/memories/memory-054.jpg",
  "/memories/memory-055.jpg",
  "/memories/memory-056.jpg",
  "/memories/memory-057.jpg",
  "/memories/memory-058.jpg",
  "/memories/memory-059.jpg",
  "/memories/memory-060.jpg",
  "/memories/memory-061.jpg",
  "/memories/memory-062.jpg",
  "/memories/memory-063.jpg",
  "/memories/memory-064.jpg",
  "/memories/memory-065.jpg",
  "/memories/memory-066.jpg",
  "/memories/memory-067.jpg",
  "/memories/memory-068.jpg",
  "/memories/memory-069.jpg",
  "/memories/memory-070.jpg",
  "/memories/memory-071.jpg",
  "/memories/memory-072.jpg",
  "/memories/memory-073.jpg",
  "/memories/memory-074.jpg",
  "/memories/memory-075.jpg",
  "/memories/memory-076.jpg",
  "/memories/memory-077.jpg",
  "/memories/memory-078.jpg",
  "/memories/memory-079.jpg",
  "/memories/memory-080.jpg",
  "/memories/memory-081.jpg",
  "/memories/memory-082.jpg",
  "/memories/memory-083.jpg",
  "/memories/memory-084.jpg",
  "/memories/memory-086.jpg",
  "/memories/memory-087.jpg",
  "/memories/memory-088.jpg"
];

const questions = [
  "Will you keep being my favourite person every single day? 💗",
  "Will you let me annoy you with silly jokes forever? 😂",
  "Can I keep stealing hugs (and maybe a bite of your food)? 🤗",
  "Will you go on a million more little dates with me? 🌹",
  "Will you hold my hand through every adventure ahead? 🥰",
];

// ----------------------------------
// TYPES
// ----------------------------------

type ButtonPosition = {
  left: number;
  top: number;
};

type PositionSetter = Dispatch<
  SetStateAction<ButtonPosition | null>
>;

type LoveSong = ReturnType<typeof createLoveSong>;

// ----------------------------------
// FLOATING HEARTS
// ----------------------------------

function FloatingHearts() {
  return (
    <div className="floaties" aria-hidden="true">
      {Array.from({ length: 18 }, (_, i) => (
        <span
          key={i}
          style={{
            left: `${(i * 17 + 5) % 100}%`,
            animationDelay: `${(i % 7) * -1.8}s`,
            animationDuration: `${9 + (i % 5)}s`,
          }}
        >
          {i % 3 === 0 ? "✦" : "♡"}
        </span>
      ))}
    </div>
  );
}

// ----------------------------------
// MAIN APP
// ----------------------------------

export default function App() {
  const [opened, setOpened] = useState(false);
  const [reasonIndex, setReasonIndex] = useState(-1);
  const [promiseIndex, setPromiseIndex] = useState(-1);
  const [musicOn, setMusicOn] = useState(false);
  const [proposalAccepted, setProposalAccepted] = useState(false);
  const [song, setSong] = useState<LoveSong | null>(null);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const [noPosition, setNoPosition] =
    useState<ButtonPosition | null>(null);

  const [proposalNoPosition, setProposalNoPosition] =
    useState<ButtonPosition | null>(null);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Progressive sections:
  // 0 = hero only
  // 1 = + chapter one (story)
  // 2 = + memories
  // 3 = + reasons
  // 4 = + promises
  // 5 = + quiz
  // 6 = + proposal + footer
  const [step, setStep] = useState(0);

  useEffect(() => {
    return () => song?.stop();
  }, [song]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") {
        setLightboxIndex(
          (i) =>
            i === null
              ? null
              : (i - 1 + memoryPhotos.length) % memoryPhotos.length
        );
      }
      if (e.key === "ArrowRight") {
        setLightboxIndex(
          (i) =>
            i === null ? null : (i + 1) % memoryPhotos.length
        );
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxIndex]);

  const toggleMusic = () => {
    if (musicOn) {
      song?.stop();
      setSong(null);
      setMusicOn(false);
    } else {
      const nextSong = createLoveSong();
      setSong(nextSong);
      setMusicOn(true);
    }
  };

  const goTo = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const unlockAndGo = (nextStep: number, id: string) => {
    setStep(nextStep);
    window.setTimeout(() => goTo(id), 80);
  };

  // const moveNoButton = (
  //   event: ReactPointerEvent<HTMLButtonElement>,
  //   setPosition: PositionSetter
  // ) => {
  //   const button = event.currentTarget;
  //   const container = button.parentElement;

  //   if (!container) return;

  //   const containerWidth = container.clientWidth;
  //   const containerHeight = Math.max(container.clientHeight, 180);

  //   const buttonWidth = button.offsetWidth;
  //   const buttonHeight = button.offsetHeight;

  //   const maxX = Math.max(0, containerWidth - buttonWidth);
  //   const maxY = Math.max(0, containerHeight - buttonHeight);

  //   // Prefer the lower half / sides so it rarely covers YES
  //   const isMobile = window.innerWidth <= 600;
  //   let left: number;
  //   let top: number;

  //   if (isMobile) {
  //     // On mobile: jump mostly below or to the side of the YES area
  //     left = Math.random() * maxX;
  //     top = Math.max(buttonHeight + 12, Math.random() * maxY);
  //   } else {
  //     // Desktop: keep NO more on the right side
  //     const minX = Math.min(containerWidth * 0.45, maxX);
  //     left = minX + Math.random() * Math.max(0, maxX - minX);
  //     top = Math.random() * maxY;
  //   }

  //   setPosition({ left, top });
  // };

  const moveNoButton = (
    event: ReactPointerEvent<HTMLButtonElement>,
    setPosition: PositionSetter
  ) => {
    const button = event.currentTarget;
    const container = button.parentElement;

    if (!container) return;

    const containerWidth = container.clientWidth;
    const containerHeight = Math.max(container.clientHeight, 200);

    const buttonWidth = button.offsetWidth;
    const buttonHeight = button.offsetHeight;

    const maxX = Math.max(0, containerWidth - buttonWidth);
    const maxY = Math.max(0, containerHeight - buttonHeight);

    // Always prefer lower half so NO rarely covers the YES button
    const minTop = Math.min(maxY, Math.max(buttonHeight + 16, containerHeight * 0.42));
    const left = Math.random() * maxX;
    const top = minTop + Math.random() * Math.max(0, maxY - minTop);

    setPosition({ left, top });
  };
  const handleYes = () => {
    setNoPosition(null);

    if (questionIndex === questions.length - 1) {
      setQuizComplete(true);
    } else {
      setQuestionIndex((previous) => previous + 1);
    }
  };

  return (
    <main>
      <Scene3D />
      <FloatingHearts />


      <button
        className="music-toggle"
        onClick={toggleMusic}
        aria-label="Toggle music"
      >
        {musicOn ? (
          <Music2 size={18} />
        ) : (
          <VolumeX size={18} />
        )}

        <span>{musicOn ? "Music on" : "Play our tune"}</span>
      </button>

      {!opened ? (
        <section className="welcome">
          <div className="sparkle sparkle-one">✦</div>
          <div className="sparkle sparkle-two">✧</div>

          <div className="eyebrow">
            <Heart size={14} fill="currentColor" />
            A tiny surprise, made just for you
          </div>

          <h1>
            Hey, <em>Muchchu!</em>
          </h1>

          <p className="lead">
            Someone has been collecting a whole lot of love for you...
          </p>

          <button
            className="envelope"
            onClick={() => setOpened(true)}
            aria-label="Open your surprise"
          >
            <span className="envelope-heart">♡</span>
            <span className="envelope-hint">TAP TO OPEN</span>
          </button>

          <p className="tiny-note">
            Psst... headphones recommended 🎧
          </p>
        </section>
      ) : (
        <>
          <section className="hero">
            <div className="eyebrow">
              <Sparkles size={14} />
              OUR FIRST WEDDING ANNIVERSARY
            </div>

            <h1>
              365 days of <em>us.</em>
            </h1>

            <p className="lead">
              One year married. A million little moments.
              And forever still to come.
            </p>

            <div className="big-heart">
              <Heart size={56} fill="currentColor" />
            </div>

            <div className="date-pill">
              12 November 2025 — 12 November 2026
            </div>

            <button
              className="primary-button"
              onClick={() => unlockAndGo(1, "story")}
            >
              Come, let's relive our little story
              <ArrowDown size={17} />
            </button>
          </section>

          {step >= 1 && (
            <section className="section section-reveal" id="story">
              <div className="section-icon">
                <Stars />
              </div>

              <p className="eyebrow">CHAPTER ONE</p>

              <h2>
                And just like that,
                <br />
                <em>we became us.</em>
              </h2>

              <p className="section-copy">
                A year ago, we began a new adventure.
                I don't know every chapter waiting for us,
                but I know who I want beside me for all of them.
              </p>

              <div className="memory-card">
                <span className="memory-doodle">♡ ✦ ♡</span>

                <h3>My favourite plot twist?</h3>

                <p>
                  Getting to call my favourite person my wife.
                </p>

                <span className="handwritten">
                  Always you, Muchchu.
                </span>
              </div>

              <button
                className="continue-button"
                onClick={() => unlockAndGo(2, "memories")}
              >
                Next: Our little album
                <ArrowDown size={16} />
              </button>
            </section>
          )}

          {step >= 2 && (
            <section className="section memories-section section-reveal" id="memories">
              <div className="section-icon">
                <Camera />
              </div>

              <p className="eyebrow">OUR LITTLE ALBUM</p>

              <h2>
                Moments that
                <br />
                <em>made us, us.</em>
              </h2>

              <p className="section-copy">
                Every photo is a little piece of our story —
                the laughs, the quiet days, the adventures,
                and all the in-between that only we know.
              </p>

              <div className="photo-grid">
                {memoryPhotos.map((src, index) => (
                  <button
                    key={src}
                    className="photo-item"
                    onClick={() => setLightboxIndex(index)}
                    aria-label={`Open memory ${index + 1}`}
                  >
                    <img
                      src={src}
                      alt={`Memory ${index + 1}`}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="photo-overlay">
                      <Heart size={20} fill="currentColor" />
                    </span>
                  </button>
                ))}
              </div>

              <p className="memories-count">
                {memoryPhotos.length} little pieces of us 💕
              </p>

              <button
                className="continue-button"
                onClick={() => unlockAndGo(3, "reasons")}
              >
                Next: Reasons I adore you
                <ArrowDown size={16} />
              </button>
            </section>
          )}

          {lightboxIndex !== null && (
            <div
              className="lightbox"
              onClick={() => setLightboxIndex(null)}
              role="dialog"
              aria-modal="true"
            >
              <button
                className="lightbox-close"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close"
              >
                <X size={28} />
              </button>

              <button
                className="lightbox-nav lightbox-prev"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(
                    (lightboxIndex - 1 + memoryPhotos.length) %
                    memoryPhotos.length
                  );
                }}
                aria-label="Previous photo"
              >
                <ChevronLeft size={32} />
              </button>

              <img
                src={memoryPhotos[lightboxIndex]}
                alt={`Memory ${lightboxIndex + 1}`}
                className="lightbox-image"
                onClick={(e) => e.stopPropagation()}
              />

              <button
                className="lightbox-nav lightbox-next"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(
                    (lightboxIndex + 1) % memoryPhotos.length
                  );
                }}
                aria-label="Next photo"
              >
                <ChevronRight size={32} />
              </button>

              <div className="lightbox-counter">
                {lightboxIndex + 1} / {memoryPhotos.length}
              </div>
            </div>
          )}

          {step >= 3 && (
            <section className="section tinted section-reveal" id="reasons">
              <div className="section-icon">
                <Gift />
              </div>

              <p className="eyebrow">CHAPTER TWO</p>

              <h2>
                A few little reasons
                <br />
                <em>I adore you.</em>
              </h2>

              <p className="section-copy">
                Tap the heart. I have a few things I want you to know
                (although I could write a thousand).
              </p>

              <div className="reason-card">
                <div className="reason-count">
                  {reasonIndex < 0
                    ? "A LITTLE LOVE NOTE"
                    : `REASON ${reasonIndex + 1} OF ${reasons.length}`}
                </div>

                <p className="reason-text">
                  {reasonIndex < 0
                    ? "Ready, Muchchu? 💗"
                    : reasons[reasonIndex]}
                </p>

                <button
                  className="round-button"
                  onClick={() =>
                    setReasonIndex(
                      (reasonIndex + 1) % reasons.length
                    )
                  }
                >
                  <Heart fill="currentColor" />
                  {reasonIndex < 0
                    ? "Reveal a reason"
                    : "One more reason"}
                </button>
              </div>

              <button
                className="continue-button"
                onClick={() => unlockAndGo(4, "promises")}
              >
                Next: Little promises
                <ArrowDown size={16} />
              </button>
            </section>
          )}

          {step >= 4 && (
            <section className="section section-reveal" id="promises">
              <div className="section-icon">
                <InfinityIcon />
              </div>

              <p className="eyebrow">CHAPTER THREE</p>

              <h2>
                Little promises,
                <br />
                <em>big forever.</em>
              </h2>

              <p className="section-copy">
                Marriage isn't only about the big days.
                It's about all the little ways we show up for each other.
              </p>

              <div className="promise-card">
                <div className="promise-number">
                  {promiseIndex < 0
                    ? "∞"
                    : `0${promiseIndex + 1}`}
                </div>

                <p>
                  {promiseIndex < 0
                    ? "A promise is waiting for you..."
                    : promises[promiseIndex]}
                </p>

                <button
                  className="text-button"
                  onClick={() =>
                    setPromiseIndex(
                      (promiseIndex + 1) % promises.length
                    )
                  }
                >
                  Read a promise <span>→</span>
                </button>
              </div>

              <button
                className="continue-button"
                onClick={() => unlockAndGo(5, "love-quiz")}
              >
                Next: A little love quiz
                <ArrowDown size={16} />
              </button>
            </section>
          )}

          {step >= 5 && (
            <section className="quiz-section section-reveal" id="love-quiz">
              <div className="quiz-card">
                <span className="quiz-label">
                  A LITTLE LOVE QUIZ 💌
                </span>

                {!quizComplete ? (
                  <>
                    <div className="quiz-progress">
                      {questions.map((_, index) => (
                        <span
                          key={index}
                          className={
                            index <= questionIndex ? "active" : ""
                          }
                        />
                      ))}
                    </div>

                    <p className="quiz-count">
                      Question {questionIndex + 1} of{" "}
                      {questions.length}
                    </p>

                    <h2
                      key={questionIndex}
                      className="quiz-question"
                    >
                      {questions[questionIndex]}
                    </h2>

                    <div
                      className="quiz-actions"
                      style={{
                        position: "relative",
                        minHeight: "200px",
                      }}
                    >
                      <button
                        className="quiz-yes"
                        onClick={handleYes}
                      >
                        YES! 💗
                      </button>

                      <button
                        className="quiz-no"
                        style={{
                          position: "absolute",
                          ...(noPosition
                            ? {
                              left: `${noPosition.left}px`,
                              top: `${noPosition.top}px`,
                              right: "auto",
                              transform: "none",
                            }
                            : {
                              right: "6%",
                              bottom: "8%",
                              top: "auto",
                              transform: "none",
                            }),
                        }}
                        onPointerEnter={(event) =>
                          moveNoButton(event, setNoPosition)
                        }
                        onPointerDown={(event) =>
                          moveNoButton(event, setNoPosition)
                        }
                      >
                        NO 🙈
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="quiz-complete">
                    <div className="quiz-heart">💖</div>

                    <h2>Yayyyy, Muchchu!</h2>

                    <p>
                      I knew all your answers would be YES.
                      You are stuck with me forever! 🥰
                    </p>

                    <button
                      className="quiz-yes"
                      onClick={() => unlockAndGo(6, "proposal")}
                    >
                      One last surprise ❤️
                    </button>
                  </div>
                )}
              </div>
            </section>
          )}

          {step >= 6 && (
            <>
              <section
                className="proposal-section section-reveal"
                id="proposal"
              >
                <div className="proposal-stars">
                  ✦　♡　✧　♡　✦
                </div>

                <div className="ring">💍</div>

                <p className="eyebrow">
                  THE MOST IMPORTANT QUESTION
                </p>

                <h2>
                  Muchchu,
                  <br />
                  <em>will you marry me again?</em>
                </h2>

                <p className="proposal-copy">
                  If life gave me a thousand beginnings,
                  I would find you in every one of them.
                  I'd choose your hand, your laugh, your heart —
                  every single time.
                </p>

                {!proposalAccepted ? (
                  <div
                    className="proposal-actions"
                    style={{
                      position: "relative",
                      minHeight: "240px",
                    }}
                  >
                    <button
                      className="yes-button"
                      onClick={() => {
                        setProposalAccepted(true);
                      }}
                    >
                      YES! A MILLION TIMES YES 💗
                    </button>

                    <button
                      className="maybe-button"
                      style={{
                        position: "absolute",
                        ...(proposalNoPosition
                          ? {
                            left: `${proposalNoPosition.left}px`,
                            top: `${proposalNoPosition.top}px`,
                            right: "auto",
                            transform: "none",
                          }
                          : {
                            right: "6%",
                            bottom: "8%",
                            top: "auto",
                            transform: "none",
                          }),
                      }}
                      onPointerEnter={(event) =>
                        moveNoButton(event, setProposalNoPosition)
                      }
                      onPointerDown={(event) =>
                        moveNoButton(event, setProposalNoPosition)
                      }
                    >
                      NO 🙈
                    </button>
                  </div>
                ) : (
                  <div className="accepted">
                    <PartyPopper size={38} />

                    <h3>SHE SAID YES! AGAIN! 🎉</h3>

                    <p>Best. Decision. Ever.</p>

                    <div className="confetti">
                      ♥ ✦ ♥ ✧ ♥ ✦ ♥
                    </div>
                  </div>
                )}

                <p className="forever">
                  A thousand tomorrows. All with you. ❤️
                </p>
              </section>

              <footer>
                <Heart size={16} fill="currentColor" />

                <p>
                  Made with all my love, just for you, Muchchu.
                </p>

                <span>
                  Happy first anniversary · 12.11.2026
                </span>
              </footer>
            </>
          )}
        </>
      )}
    </main>
  );
}