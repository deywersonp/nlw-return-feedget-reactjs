import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";
import bugImageUrl from '../../assets/bug.svg';
import ideaImageUrl from '../../assets/idea.svg';
import thoughtImageUrl from '../../assets/thought.svg';
import { SelectLang } from "./SelectLang";

export const feedbackTypes = {
  BUG: {
    title: 'PROBLEM',
    image: {
      source: bugImageUrl,
      alt: 'Imagem de um inseto',
    },
  },
  IDEA: {
    title: 'IDEA',
    image: {
      source: ideaImageUrl,
      alt: 'Imagem de uma lâmpada',
    },
  },
  OTHER: {
    title: 'OTHER',
    image: {
      source: thoughtImageUrl,
      alt: 'Imagem de um balão de pensamento',
    },
  },
};

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
  const { t } = useTranslation('common');

  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleRestartFeedback() {
    setFeedbackSent(false);
    setFeedbackType(null);
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      {
        feedbackSent ? (
          <FeedbackSuccessStep
            onFeedbackRestartRequested={handleRestartFeedback}
          />
        ) : (
          <>
            {!feedbackType ? (
              <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
            ) : (
              <FeedbackContentStep
                feedbackType={feedbackType}
                onFeedbackRestartRequested={handleRestartFeedback}
                onFeedbackSent={() => setFeedbackSent(true)}
              />
            )}
          </>
        )
      }

      <footer className="text-xs text-neutral-400 flex items-center">
        <p>
          {t('FOOTER_DESCRIPTION')}
          {' '}
          <a className="underline underline-offset-2" href="https://github.com/deywersonp">Deywerson Pereira</a>
        </p>
        <SelectLang />
      </footer>
    </div>
  );
}