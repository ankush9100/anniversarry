
import {
  useEffect,
  useState,
  type PointerEvent as ReactPointerEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
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
  Camera,        // ← add
  X,             // ← add
  ChevronLeft,   // ← add
  ChevronRight,  // ← add
} from "lucide-react";

import { createLoveSong } from "./music";

// ----------------------------------
// DATA
// ----------------------------------

const memoryPhotos = [
  "/memories/IMG-20251215-WA0006.jpg",
  "/memories/IMG-20251215-WA0025.jpg",
  "/memories/IMG-20251215-WA0027.jpg",
  "/memories/IMG-20251215-WA0032.jpg",
  "/memories/IMG-20251215-WA0047.jpg",
  "/memories/IMG-20260121-WA0000.jpg",
  "/memories/IMG-20260121-WA0006.jpg",
  "/memories/IMG-20260121-WA0007.jpg",
  "/memories/IMG-20260121-WA0008.jpg",
  "/memories/IMG-20260121-WA0009.jpg",
  "/memories/IMG-20260121-WA0010.jpg",
  "/memories/IMG-20260207-WA0036.jpg",
  "/memories/IMG-20260207-WA0037.jpg",
  "/memories/IMG-20260207-WA0038.jpg",
  "/memories/IMG-20260207-WA0044.jpg",
  "/memories/IMG-20260207-WA0046.jpg",
  "/memories/IMG-20260207-WA0050.jpg",
  "/memories/IMG-20260207-WA0051.jpg",
  "/memories/IMG-20260222-WA0099.jpg",
  "/memories/IMG-20260222-WA0100.jpg",
  "/memories/IMG-20260222-WA0101.jpg",
  "/memories/IMG-20260222-WA0102.jpg",
  "/memories/IMG-20260222-WA0103.jpg",
  "/memories/IMG-20260222-WA0104.jpg",
  "/memories/IMG-20260222-WA0105.jpg",
  "/memories/IMG-20260503-WA0034.jpg",
  "/memories/IMG-20260503-WA0035.jpg",
  "/memories/IMG-20260503-WA0036.jpg",
  "/memories/IMG-20260503-WA0041.jpg",
  "/memories/IMG-20260503-WA0042.jpg",
  "/memories/IMG-20260503-WA0043.jpg",
  "/memories/IMG-20260503-WA0044.jpg",
  "/memories/IMG-20260503-WA0045.jpg",
  "/memories/IMG-20260503-WA0046.jpg",
  "/memories/IMG-20260503-WA0047.jpg",
  "/memories/IMG-20260503-WA0048.jpg",
  "/memories/IMG-20260503-WA0049.jpg",
  "/memories/IMG-20260626-WA0030.jpg",
  "/memories/IMG-20260626-WA0031.jpg",
  "/memories/IMG-20260626-WA0032.jpg",
  "/memories/IMG-20260626-WA0034.jpg",
  "/memories/IMG-20260702-WA0000.jpg",
  "/memories/IMG-20260702-WA0001.jpg",
  "/memories/IMG-20260702-WA0013.jpg",
  "/memories/IMG-20260702-WA0014.jpg",
  "/memories/IMG-20260702-WA0025.jpg",
  "/memories/IMG-20260702-WA0026.jpg",
  "/memories/IMG-20260702-WA0027.jpg",
  "/memories/IMG-20260702-WA0056.jpg",
  "/memories/IMG-20260810-WA0014.jpg",
  "/memories/IMG-20260810-WA0015.jpg",
  "/memories/IMG-20260810-WA0016.jpg",
  "/memories/IMG-20260810-WA0017.jpg",
  "/memories/IMG-20261003-WA0008.jpg",
  "/memories/IMG-20261003-WA0010.jpg",
  "/memories/IMG-20261003-WA0011.jpg",
  "/memories/IMG-20261015-WA0025.jpg",
  "/memories/IMG-20261016-WA0007.jpg",
  "/memories/IMG-20261020-WA0064.jpg",
  "/memories/IMG-20261104-WA0000.jpg",
  "/memories/IMG-20261104-WA0001.jpg",
  "/memories/IMG-20261104-WA0002.jpg",
  "/memories/IMG-20261105-WA0028.jpg",
  "/memories/IMG-20261105-WA0032.jpg",
  "/memories/IMG-20261105-WA0034.jpg",
  "/memories/IMG-20261105-WA0044.jpg",
  "/memories/IMG-20261105-WA0045.jpg",
  "/memories/IMG-20261105-WA0046.jpg",
  "/memories/IMG-20261105-WA0047.jpg",
  "/memories/IMG-20261105-WA0048.jpg",
  "/memories/IMG-20261105-WA0049.jpg",
  "/memories/IMG-20261105-WA0050.jpg",
  "/memories/IMG-20261105-WA0051.jpg",
  "/memories/IMG-20261105-WA0052.jpg",
  "/memories/IMG-20261105-WA0053.jpg",
  "/memories/IMG-20261105-WA0054.jpg",
  "/memories/IMG-20261105-WA0068.jpg",
  "/memories/IMG-20261105-WA0079.jpg",
  "/memories/IMG-20261109-WA0046.jpg",
  "/memories/IMG-20261110-WA0003.jpg",
  "/memories/IMG-20261110-WA0004.jpg",
  "/memories/IMG20260113221717.jpg",
  "/memories/IMG20260113221808.jpg",
  "/memories/IMG20260113221830.jpg",
  "/memories/IMG20260113221858.jpg",
  "/memories/IMG20260503194329.jpg",
  "/memories/IMG20260503194400.jpg",
  "/memories/IMG20260503194401.jpg",
  "/memories/IMG20260503194449.jpg",
  "/memories/IMG20260503194451.jpg",
  "/memories/IMG20260503194452.jpg",
  "/memories/IMG20260503194453.jpg",
  "/memories/IMG20260503194629.jpg",
  "/memories/IMG20260503194634.jpg",
  "/memories/IMG20260503194636.jpg",
  "/memories/IMG20260627125655.jpg",
  "/memories/IMG20260627125733.jpg",
  "/memories/IMG20261008202643.jpg",
  "/memories/IMG20261008202804.jpg",
  "/memories/IMG20261011212242.jpg",
];

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
  // Existing states
  const [opened, setOpened] = useState(false);
  const [reasonIndex, setReasonIndex] = useState(-1);
  const [promiseIndex, setPromiseIndex] = useState(-1);
  const [musicOn, setMusicOn] = useState(false);
  const [proposalAccepted, setProposalAccepted] = useState(false);
  const [song, setSong] = useState<LoveSong | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Quiz states
  const [questionIndex, setQuestionIndex] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  // Independent NO button positions
  const [noPosition, setNoPosition] =
    useState<ButtonPosition | null>(null);

  const [proposalNoPosition, setProposalNoPosition] =
    useState<ButtonPosition | null>(null);

  // Stop music when component unmounts
  useEffect(() => {
    return () => song?.stop();
  }, [song]);

  // Lightbox: ESC to close + arrow keys + lock body scroll
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
          (i) => (i === null ? null : (i + 1) % memoryPhotos.length)
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
  // ----------------------------------
  // MUSIC
  // ----------------------------------

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

  // ----------------------------------
  // NAVIGATION
  // ----------------------------------

  const goTo = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  // ----------------------------------
  // NO BUTTON MOVEMENT
  // ----------------------------------

  const moveNoButton = (
    event: ReactPointerEvent<HTMLButtonElement>,
    setPosition: PositionSetter
  ) => {
    const button = event.currentTarget;
    const container = button.parentElement;

    if (!container) return;

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    const buttonWidth = button.offsetWidth;
    const buttonHeight = button.offsetHeight;

    const maxX = Math.max(0, containerWidth - buttonWidth);
    const maxY = Math.max(0, containerHeight - buttonHeight);

    // Keep NO on the right side of the container
    // so it does not cover the YES button.
    const minX = Math.min(containerWidth * 0.5, maxX);

    const left =
      minX + Math.random() * Math.max(0, maxX - minX);

    const top = Math.random() * maxY;

    setPosition({ left, top });
  };

  // ----------------------------------
  // YES BUTTON / QUIZ
  // ----------------------------------

  const handleYes = () => {
    setNoPosition(null);

    if (questionIndex === questions.length - 1) {
      setQuizComplete(true);
    } else {
      setQuestionIndex((previous) => previous + 1);
    }
  };

  // ----------------------------------
  // JSX
  // ----------------------------------

  return (
    <main>
      <FloatingHearts />

      {/* MUSIC BUTTON */}

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
        // ----------------------------------
        // WELCOME SCREEN
        // ----------------------------------

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
          {/* ----------------------------------
              HERO SECTION
          ---------------------------------- */}

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
              onClick={() => goTo("story")}
            >
              Come, let's relive our little story
              <ArrowDown size={17} />
            </button>
          </section>

          {/* ----------------------------------
              CHAPTER ONE
          ---------------------------------- */}

          <section className="section" id="story">
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
          </section>

          {/* ----------------------------------
              CHAPTER TWO
          ---------------------------------- */}

          <section className="section tinted">
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
          </section>

          {/* ----------------------------------
              CHAPTER THREE
          ---------------------------------- */}

          <section className="section">
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
          </section>

          {/* ----------------------------------
              LOVE QUIZ
          ---------------------------------- */}

          <section className="quiz-section" id="love-quiz">
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
                      minHeight: "150px",
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
                            right: "8%",
                            top: "50%",
                            transform: "translateY(-50%)",
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
                    onClick={() => goTo("proposal")}
                  >
                    One last surprise ❤️
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* ----------------------------------

          {/* Lightbox */}
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

          {/* ----------------------------------
              FINAL PROPOSAL
          ---------------------------------- */}

          <section
            className="proposal-section"
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
                  minHeight: "140px",
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
                        right: "8%",
                        top: "50%",
                        transform: "translateY(-50%)",
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
     {/*
              OUR MEMORIES (PHOTOS)
---------------------------------- */}

          <section className="section memories-section" id="memories">
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
          </section>

          {/* ----------------------------------
              FOOTER
          ---------------------------------- */}

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
    </main>
  );
}
