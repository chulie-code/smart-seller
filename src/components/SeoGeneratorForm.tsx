"use client";

import { useActionState, useEffect, useState } from "react";
import { generateSeo, type SeoActionState } from "@/app/seo/actions";
import { processSteps } from "@/data/process";
import {
  SEO_PLATFORMS,
  type SeoGenerationResult,
  type SeoPlatform,
  type SeoPlatformResult,
} from "@/lib/seo/prompt";

type Stage = 0 | 1 | 2 | 3 | 4; // 0=idle, 1=upload, 2=analyze, 3=generate, 4=done

export default function SeoGeneratorForm({
  defaultProductName,
}: {
  defaultProductName?: string;
}) {
  const [state, formAction, isPending] = useActionState<
    SeoActionState | undefined,
    FormData
  >(generateSeo, undefined);
  const [pendingStage, setPendingStage] = useState<1 | 2 | 3>(1);
  const [photoNames, setPhotoNames] = useState<string[]>([]);

  useEffect(() => {
    if (!isPending) return;
    // 진행 인디케이터: 1(수신) → 2(분석) → 3(생성) 시간 기반 전환
    const t0 = setTimeout(() => setPendingStage(1), 0);
    const t1 = setTimeout(() => setPendingStage(2), 1200);
    const t2 = setTimeout(() => setPendingStage(3), 5500);
    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isPending]);

  const stage: Stage = isPending ? pendingStage : state?.result ? 4 : 0;

  return (
    <div className="space-y-8">
      <StepIndicator stage={stage} />

      <form
        action={formAction}
        className="rounded-2xl border border-line bg-canvas p-5 shadow-sm sm:p-7"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="상품명 (원안)"
            name="productName"
            placeholder="예: 식품용 실리콘 주걱"
            defaultValue={state?.input?.productName ?? defaultProductName}
            required
            maxLength={120}
          />
          <Field
            label="핵심 키워드 (쉼표 구분)"
            name="keywords"
            placeholder="예: 실리콘주걱, 베이킹, 내열, 1+1"
            defaultValue={state?.input?.keywords}
            required
            maxLength={300}
          />
          <Field
            label="타겟 고객 (선택)"
            name="targetAudience"
            placeholder="예: 20~30대 홈베이커"
            defaultValue={state?.input?.targetAudience}
          />
          <Field
            label="가격대 (선택)"
            name="priceRange"
            placeholder="예: 9,900원~14,900원"
            defaultValue={state?.input?.priceRange}
          />
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-ink">
              <span>주요 특징·셀링포인트 (선택)</span>
              <textarea
                name="features"
                rows={3}
                defaultValue={state?.input?.features}
                maxLength={800}
                placeholder="예: 230℃ 내열, 식품용 실리콘, 1+1 구성, 손잡이 미끄럼방지"
                className="mt-1.5 block w-full resize-y rounded-lg border border-line bg-canvas px-3 py-2 text-sm text-ink shadow-sm outline-none transition-colors placeholder:text-subtle focus:border-brand focus:ring-2 focus:ring-brand/20"
              />
            </label>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-ink">
              <span>상품 사진 (선택 · 최대 3장 · JPG/PNG/WEBP · 4MB 이하)</span>
              <input
                type="file"
                name="photos"
                accept="image/jpeg,image/png,image/webp"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files ?? []);
                  setPhotoNames(files.slice(0, 3).map((f) => f.name));
                }}
                className="mt-1.5 block w-full cursor-pointer rounded-lg border border-dashed border-line bg-mist/40 px-3 py-3 text-sm text-ink file:mr-3 file:rounded-md file:border-0 file:bg-brand file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white hover:bg-mist"
              />
            </label>
            {photoNames.length > 0 && (
              <ul className="mt-2 flex flex-wrap gap-2 text-xs text-muted">
                {photoNames.map((n) => (
                  <li
                    key={n}
                    className="rounded-full bg-soft px-3 py-1 text-brand-deep"
                  >
                    📎 {n}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {state?.error && (
          <p
            role="alert"
            className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
          >
            {state.error}
          </p>
        )}
        {state?.message && (
          <p
            role="status"
            className="mt-4 rounded-lg border border-brand/20 bg-soft px-3 py-2 text-sm text-brand-deep"
          >
            {state.message}
          </p>
        )}

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-subtle">
            사진과 키워드를 보내면 AI가 4단계로 SEO 자료를 만들어드려요. 분당 5회까지 호출 가능.
          </p>
          <button
            type="submit"
            disabled={isPending}
            className="rounded-full bg-brand px-7 py-3 text-sm font-bold text-white shadow-sm transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
          >
            {isPending ? "AI 생성 중..." : "AI로 SEO 자료 생성 →"}
          </button>
        </div>
      </form>

      {state?.result && (
        <ResultPanel
          result={state.result}
          fileBase={state.input?.productName ?? "smart-seller"}
        />
      )}
    </div>
  );
}

function StepIndicator({ stage }: { stage: Stage }) {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {processSteps.map((s, idx) => {
        const stepNum = (idx + 1) as 1 | 2 | 3 | 4;
        const active = stage === stepNum;
        const done = stage > stepNum;
        return (
          <li
            key={s.step}
            className={`rounded-2xl border p-4 transition-colors ${
              active
                ? "border-brand bg-soft"
                : done
                  ? "border-line bg-canvas"
                  : "border-line bg-canvas/60"
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`font-display text-2xl font-black ${
                  active || done ? "text-brand" : "text-line"
                }`}
              >
                {s.step}
              </span>
              {done && <span className="text-sm font-bold text-brand">✓</span>}
              {active && (
                <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-brand" />
              )}
            </div>
            <h3
              className={`mt-2 text-sm font-bold ${
                active || done ? "text-ink" : "text-muted"
              }`}
            >
              {s.title}
            </h3>
            <p className="mt-1 text-xs leading-5 text-muted">{s.body}</p>
          </li>
        );
      })}
    </ol>
  );
}

function ResultPanel({
  result,
  fileBase,
}: {
  result: SeoGenerationResult;
  fileBase: string;
}) {
  const byName = new Map(result.platforms.map((p) => [p.platform, p]));
  const ordered = SEO_PLATFORMS.filter((name): name is SeoPlatform =>
    byName.has(name),
  );
  const [active, setActive] = useState<SeoPlatform>(ordered[0] ?? "스마트스토어");
  const current = byName.get(active);

  return (
    <section className="rounded-2xl border border-line bg-canvas shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line p-3">
        <div className="flex flex-wrap gap-1">
          {ordered.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setActive(name)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                name === active
                  ? "bg-brand text-white shadow-sm"
                  : "text-muted hover:bg-soft hover:text-brand-deep"
              }`}
            >
              {name}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => downloadCsv(result, fileBase)}
          className="rounded-full border border-brand bg-brand/5 px-4 py-2 text-sm font-semibold text-brand-deep transition-colors hover:bg-brand hover:text-white"
        >
          ⬇ 일괄등록 엑셀(CSV) 다운로드
        </button>
      </div>

      {current && (
        <div className="space-y-6 p-5 sm:p-7">
          <ScoreCard score={current.seoScore} rationale={current.seoRationale} />

          <CompetitorBlock data={current.competitorAnalysis} />

          <Block label="추천 상품명" copyValue={current.productName}>
            <p className="text-ink">{current.productName}</p>
          </Block>

          <Block label="추천 카테고리">
            <p className="text-ink">{current.category}</p>
          </Block>

          <Block label="태그">
            <ul className="flex flex-wrap gap-2">
              {current.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-soft px-3 py-1 text-xs font-medium text-brand-deep"
                >
                  #{tag}
                </li>
              ))}
            </ul>
          </Block>

          <Block label="상세설명" copyValue={current.description}>
            <p className="whitespace-pre-wrap leading-7 text-ink/90">
              {current.description}
            </p>
          </Block>

          <Block label="추천 키워드">
            <ul className="space-y-2">
              {current.recommendedKeywords.map((kw) => (
                <li
                  key={kw.keyword}
                  className="flex flex-col gap-1 rounded-lg border border-line bg-mist/40 p-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-ink">{kw.keyword}</span>
                    <VolumeBadge hint={kw.volumeHint} />
                  </div>
                  <span className="text-sm text-muted sm:max-w-[60%] sm:text-right">
                    {kw.reason}
                  </span>
                </li>
              ))}
            </ul>
          </Block>
        </div>
      )}
    </section>
  );
}

function CompetitorBlock({
  data,
}: {
  data: SeoPlatformResult["competitorAnalysis"];
}) {
  return (
    <div className="rounded-xl border border-accent/30 bg-accent-soft/40 p-4">
      <div className="mb-2 flex items-center gap-2">
        <span className="rounded-full bg-accent px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-white">
          2단계
        </span>
        <h3 className="text-sm font-bold text-ink">경쟁사·키워드 분석</h3>
      </div>
      <dl className="grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-xs font-semibold text-subtle">상위 노출 상품명 패턴</dt>
          <dd className="mt-1">
            <ul className="list-disc space-y-1 pl-4 text-ink/90">
              {data.titlePatterns.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold text-subtle">반복 등장 키워드</dt>
          <dd className="mt-1 flex flex-wrap gap-1.5">
            {data.commonKeywords.map((k) => (
              <span
                key={k}
                className="rounded bg-canvas px-2 py-0.5 text-xs text-ink ring-1 ring-line"
              >
                {k}
              </span>
            ))}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold text-subtle">추정 카테고리</dt>
          <dd className="mt-1 text-ink/90">{data.categoryHint}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold text-subtle">관찰 메모</dt>
          <dd className="mt-1 text-ink/90">{data.notes}</dd>
        </div>
      </dl>
    </div>
  );
}

function ScoreCard({
  score,
  rationale,
}: {
  score: number;
  rationale: string[];
}) {
  const clamped = Math.max(0, Math.min(100, Math.round(score)));
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-soft p-5 sm:flex-row sm:items-center">
      <div className="flex items-center gap-4">
        <div
          className="relative grid h-20 w-20 place-items-center rounded-full"
          style={{
            background: `conic-gradient(var(--color-brand) ${clamped}%, rgba(0,0,0,0.08) ${clamped}%)`,
          }}
        >
          <div className="grid h-16 w-16 place-items-center rounded-full bg-canvas">
            <span className="text-xl font-black text-brand-deep">{clamped}</span>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-brand-deep">SEO 점수</p>
          <p className="text-xs text-muted">최적화 정도 (0~100)</p>
        </div>
      </div>
      <ul className="flex-1 space-y-1 text-sm text-ink/90">
        {rationale.map((r, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-brand">•</span>
            <span>{r}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function VolumeBadge({ hint }: { hint: "high" | "mid" | "low" }) {
  const map = {
    high: { label: "검색량 높음", cls: "bg-emerald-100 text-emerald-700" },
    mid: { label: "검색량 보통", cls: "bg-amber-100 text-amber-700" },
    low: { label: "검색량 낮음", cls: "bg-slate-100 text-slate-600" },
  } as const;
  const m = map[hint] ?? map.mid;
  return (
    <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${m.cls}`}>
      {m.label}
    </span>
  );
}

function Block({
  label,
  children,
  copyValue,
}: {
  label: string;
  children: React.ReactNode;
  copyValue?: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-subtle">
          {label}
        </h3>
        {copyValue && <CopyButton value={copyValue} />}
      </div>
      {children}
    </div>
  );
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          /* ignore */
        }
      }}
      className="rounded-full border border-line px-3 py-1 text-xs font-medium text-muted transition-colors hover:border-brand hover:text-brand-deep"
    >
      {copied ? "복사됨" : "복사"}
    </button>
  );
}

function Field(
  props: React.InputHTMLAttributes<HTMLInputElement> & { label: string },
) {
  const { label, name, ...rest } = props;
  return (
    <label className="block text-sm font-medium text-ink">
      <span>{label}</span>
      <input
        name={name}
        {...rest}
        className="mt-1.5 block w-full rounded-lg border border-line bg-canvas px-3 py-2 text-sm text-ink shadow-sm outline-none transition-colors placeholder:text-subtle focus:border-brand focus:ring-2 focus:ring-brand/20"
      />
    </label>
  );
}

function downloadCsv(result: SeoGenerationResult, fileBase: string) {
  const headers = [
    "플랫폼",
    "상품명",
    "카테고리",
    "태그",
    "상세설명",
    "추천키워드",
    "SEO점수",
    "점수근거",
  ];
  const rows = result.platforms.map((p) => [
    p.platform,
    p.productName,
    p.category,
    p.tags.join(" / "),
    p.description,
    p.recommendedKeywords.map((k) => k.keyword).join(" / "),
    String(p.seoScore),
    p.seoRationale.join(" | "),
  ]);
  const csv = [headers, ...rows]
    .map((row) => row.map(csvCell).join(","))
    .join("\r\n");
  // BOM 으로 엑셀에서 한글 깨짐 방지
  const blob = new Blob(["﻿" + csv], {
    type: "text/csv;charset=utf-8;",
  });
  const safeName = fileBase.replace(/[\\/:*?"<>|]/g, "_").slice(0, 40);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${safeName || "smart-seller"}-seo.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function csvCell(value: string): string {
  const v = value ?? "";
  if (/[",\r\n]/.test(v)) return `"${v.replace(/"/g, '""')}"`;
  return v;
}
