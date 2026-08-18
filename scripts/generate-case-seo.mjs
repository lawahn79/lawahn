import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const ROOT_DIR = process.cwd();

const SITE_URL = 'https://lawahn.kr';
const SITE_NAME = '안재현 법률사무소';
const PHONE_NUMBER = '1688-5644';

const CASE_DATA_PATH = path.join(
  ROOT_DIR,
  'public',
  'data',
  'case-results.json',
);

const INDEX_HTML_PATH = path.join(ROOT_DIR, 'index.html');
const SITEMAP_PATH = path.join(ROOT_DIR, 'public', 'sitemap.xml');

const CASE_PAGE_ROOT = path.join(
  ROOT_DIR,
  'public',
  'case-results',
);

const MANIFEST_PATH = path.join(
  ROOT_DIR,
  'public',
  'data',
  'generated-case-pages.json',
);

const ITEM_LIST_START = '<!-- CASE-RESULT-ITEMLIST:START -->';
const ITEM_LIST_END = '<!-- CASE-RESULT-ITEMLIST:END -->';

const escapeHtml = (value = '') =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

const escapeXml = (value = '') =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

const safeJson = (value) =>
  JSON.stringify(value, null, 2).replaceAll('</script', '<\\/script');

const normalizeText = (value) =>
  typeof value === 'string' ? value.trim() : '';

const normalizeImageUrl = (imagePath) => {
  const image = normalizeText(imagePath);

  if (!image) return '';

  if (/^https?:\/\//i.test(image)) {
    return image;
  }

  return `${SITE_URL}/${image.replace(/^\/+/, '')}`;
};

const getCaseIdentifier = (item) => {
  const candidate = normalizeText(item.slug) || normalizeText(item.id);

  if (!candidate) {
    throw new Error('id 또는 slug가 없는 성공사례가 있습니다.');
  }

  if (
    candidate === '.' ||
    candidate === '..' ||
    candidate.includes('/') ||
    candidate.includes('\\')
  ) {
    throw new Error(
      `사용할 수 없는 성공사례 id 또는 slug입니다: ${candidate}`,
    );
  }

  return candidate;
};

const getCaseUrl = (item) => {
  const identifier = getCaseIdentifier(item);

  return `${SITE_URL}/case-results/${encodeURIComponent(identifier)}`;
};

const sortCases = (items) =>
  [...items].sort((a, b) => {
    const orderA = Number.isFinite(Number(a.order))
      ? Number(a.order)
      : 9999;

    const orderB = Number.isFinite(Number(b.order))
      ? Number(b.order)
      : 9999;

    return orderA - orderB;
  });

const readCases = async () => {
  const source = await fs.readFile(CASE_DATA_PATH, 'utf8');
  const parsed = JSON.parse(source);

  if (!Array.isArray(parsed)) {
    throw new Error(
      'public/data/case-results.json의 최상위 값은 배열이어야 합니다.',
    );
  }

  const visibleCases = parsed.filter(
    (item) => item && item.visible !== false,
  );

  return sortCases(visibleCases);
};

const buildItemListJsonLd = (cases) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: `${SITE_NAME} 실제 수행사건 결과`,
  description: `${SITE_NAME}가 수행한 주요 사건 결과 목록입니다.`,
  numberOfItems: cases.length,
  itemListOrder: 'https://schema.org/ItemListOrderAscending',
  itemListElement: cases.map((item, index) => {
    const title =
      normalizeText(item.title) || '수행사건 결과';

    const result = normalizeText(item.result);
    const image = normalizeImageUrl(item.thumb || item.image);

    const listItem = {
      '@type': 'ListItem',
      position: index + 1,
      url: getCaseUrl(item),
      name: result ? `${title} - ${result}` : title,
    };

    if (image) {
      listItem.image = image;
    }

    return listItem;
  }),
});

const containsItemList = (value) => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  if (value['@type'] === 'ItemList') {
    return true;
  }

  if (Array.isArray(value)) {
    return value.some(containsItemList);
  }

  return Object.values(value).some(containsItemList);
};

const removeExistingItemListScripts = (html) => {
  const scriptPattern =
    /<script\b([^>]*\btype=["']application\/ld\+json["'][^>]*)>([\s\S]*?)<\/script>/gi;

  return html.replace(
    scriptPattern,
    (completeScript, attributes, scriptContents) => {
      try {
        const parsed = JSON.parse(scriptContents.trim());

        if (containsItemList(parsed)) {
          return '';
        }
      } catch {
        // 다른 JSON-LD가 올바른 JSON이 아니더라도 원본은 보존합니다.
      }

      return completeScript;
    },
  );
};

const updateIndexItemList = async (cases) => {
  let html = await fs.readFile(INDEX_HTML_PATH, 'utf8');

  const managedBlockPattern = new RegExp(
    `${ITEM_LIST_START}[\\s\\S]*?${ITEM_LIST_END}`,
    'g',
  );

  html = html.replace(managedBlockPattern, '');
  html = removeExistingItemListScripts(html);

  const itemList = buildItemListJsonLd(cases);

  const generatedBlock = [
    ITEM_LIST_START,
    '<script type="application/ld+json">',
    safeJson(itemList),
    '</script>',
    ITEM_LIST_END,
  ].join('\n');

  if (!html.includes('</head>')) {
    throw new Error('index.html에서 </head> 태그를 찾을 수 없습니다.');
  }

  html = html.replace(
    '</head>',
    `  ${generatedBlock.replaceAll('\n', '\n  ')}\n</head>`,
  );

  await fs.writeFile(INDEX_HTML_PATH, html, 'utf8');
};

const buildCaseJsonLd = (item) => {
  const title =
    normalizeText(item.title) || '수행사건 결과';

  const result = normalizeText(item.result);
  const summary = normalizeText(item.summary);
  const category = normalizeText(item.category);
  const image = normalizeImageUrl(item.image || item.thumb);
  const url = getCaseUrl(item);

  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: result ? `${title} - ${result}` : title,
    description:
      summary ||
      `${SITE_NAME}의 ${category || '주요'} 사건 수행 결과입니다.`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    url,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: category || '법률 수행사례',
    inLanguage: 'ko-KR',
  };

  if (image) {
    article.image = [image];
  }

  return article;
};

const buildBreadcrumbJsonLd = (item) => {
  const title =
    normalizeText(item.title) || '수행사건 결과';

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '홈',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: '실제 수행사건 결과',
        item: `${SITE_URL}/#성공사례`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
        item: getCaseUrl(item),
      },
    ],
  };
};

const buildCasePageHtml = (item) => {
  const title =
    normalizeText(item.title) || '수행사건 결과';

  const result = normalizeText(item.result);
  const summary = normalizeText(item.summary);
  const category =
    normalizeText(item.category) || '수행사건';

  const image = normalizeImageUrl(item.image || item.thumb);
  const canonicalUrl = getCaseUrl(item);

  const pageTitle = result
    ? `${title} - ${result} | ${SITE_NAME}`
    : `${title} | ${SITE_NAME}`;

  const description =
    summary ||
    `${SITE_NAME}의 ${category} 사건 수행 결과입니다.`;

  const articleJsonLd = buildCaseJsonLd(item);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(item);

  const imageMarkup = image
    ? `
        <figure class="case-image">
          <img
            src="${escapeHtml(image)}"
            alt="${escapeHtml(`${title} 수행사건 결과`)}"
          />
        </figure>
      `
    : '';

  const resultMarkup = result
    ? `<p class="result">${escapeHtml(result)}</p>`
    : '';

  const summaryMarkup = summary
    ? `
        <section class="summary">
          <h2>사건 수행 내용</h2>
          <p>${escapeHtml(summary)}</p>
        </section>
      `
    : '';

  const ogImageMarkup = image
    ? `
    <meta property="og:image" content="${escapeHtml(image)}" />
    <meta name="twitter:image" content="${escapeHtml(image)}" />`
    : '';

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-RB2T0ZT3H1"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-RB2T0ZT3H1');
  </script>

  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <title>${escapeHtml(pageTitle)}</title>

  <meta
    name="description"
    content="${escapeHtml(description)}"
  />

  <meta
    name="robots"
    content="index, follow, max-image-preview:large"
  />

  <meta name="Yeti" content="index, follow" />

  <link
    rel="canonical"
    href="${escapeHtml(canonicalUrl)}"
  />

  <meta property="og:type" content="article" />
  <meta property="og:locale" content="ko_KR" />
  <meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />
  <meta property="og:title" content="${escapeHtml(pageTitle)}" />
  <meta
    property="og:description"
    content="${escapeHtml(description)}"
  />
  <meta property="og:url" content="${escapeHtml(canonicalUrl)}" />
  ${ogImageMarkup}

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(pageTitle)}" />
  <meta
    name="twitter:description"
    content="${escapeHtml(description)}"
  />

  <script type="application/ld+json">
${safeJson(articleJsonLd)}
  </script>

  <script type="application/ld+json">
${safeJson(breadcrumbJsonLd)}
  </script>

  <style>
    * {
      box-sizing: border-box;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      margin: 0;
      color: #0f172a;
      background: #f8fafc;
      font-family:
        "Noto Sans KR",
        "Apple SD Gothic Neo",
        Arial,
        sans-serif;
      line-height: 1.7;
    }

    a {
      color: inherit;
    }

    .header {
      color: #ffffff;
      background: #0f172a;
      border-bottom: 1px solid rgba(245, 158, 11, 0.35);
    }

    .header-inner {
      width: min(1080px, calc(100% - 40px));
      margin: 0 auto;
      padding: 24px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
    }

    .brand {
      text-decoration: none;
      font-size: 20px;
      font-weight: 900;
    }

    .home-link {
      color: #fbbf24;
      font-size: 14px;
      font-weight: 800;
      text-decoration: none;
    }

    main {
      width: min(900px, calc(100% - 32px));
      margin: 48px auto 80px;
    }

    .article {
      overflow: hidden;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 28px;
      box-shadow: 0 20px 60px rgba(15, 23, 42, 0.08);
    }

    .article-header {
      padding: 42px 44px 36px;
      color: #ffffff;
      background: #0f172a;
    }

    .category {
      display: inline-flex;
      margin: 0 0 18px;
      padding: 7px 14px;
      color: #fbbf24;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(251, 191, 36, 0.35);
      border-radius: 999px;
      font-size: 12px;
      font-weight: 900;
    }

    h1 {
      margin: 0;
      font-size: clamp(28px, 5vw, 48px);
      line-height: 1.25;
      letter-spacing: -0.04em;
    }

    .result {
      margin: 20px 0 0;
      color: #fca5a5;
      font-size: clamp(20px, 3vw, 28px);
      font-weight: 900;
    }

    .article-body {
      padding: 36px 44px 44px;
    }

    .case-image {
      margin: 0 0 36px;
      padding: 14px;
      text-align: center;
      background: #f1f5f9;
      border-radius: 20px;
    }

    .case-image img {
      display: block;
      width: 100%;
      max-height: 1000px;
      margin: 0 auto;
      object-fit: contain;
      background: #ffffff;
      border-radius: 12px;
    }

    .summary {
      padding: 28px;
      background: #f8fafc;
      border-left: 4px solid #d97706;
      border-radius: 16px;
    }

    .summary h2 {
      margin: 0 0 12px;
      color: #1e3a8a;
      font-size: 20px;
    }

    .summary p {
      margin: 0;
      color: #475569;
      white-space: pre-line;
    }

    .notice {
      margin: 28px 0 0;
      color: #64748b;
      font-size: 13px;
    }

    .cta {
      margin-top: 28px;
      padding: 28px;
      text-align: center;
      color: #ffffff;
      background: #172554;
      border-radius: 20px;
    }

    .cta strong {
      display: block;
      margin-bottom: 8px;
      font-size: 21px;
    }

    .cta p {
      margin: 0 0 20px;
      color: #cbd5e1;
    }

    .cta-links {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 12px;
    }

    .cta a {
      display: inline-flex;
      min-height: 48px;
      padding: 12px 22px;
      align-items: center;
      justify-content: center;
      border-radius: 999px;
      font-weight: 900;
      text-decoration: none;
    }

    .phone {
      color: #172554;
      background: #fbbf24;
    }

    .consultation {
      color: #ffffff;
      border: 1px solid rgba(255, 255, 255, 0.35);
    }

    footer {
      padding: 32px 20px;
      text-align: center;
      color: #64748b;
      font-size: 13px;
    }

    @media (max-width: 640px) {
      .header-inner {
        width: min(100% - 28px, 1080px);
        padding: 18px 0;
      }

      .brand {
        font-size: 17px;
      }

      main {
        margin-top: 24px;
      }

      .article {
        border-radius: 20px;
      }

      .article-header {
        padding: 30px 24px;
      }

      .article-body {
        padding: 24px;
      }

      .summary,
      .cta {
        padding: 22px;
      }
    }
  </style>
</head>

<body>
  <header class="header">
    <div class="header-inner">
      <a class="brand" href="${SITE_URL}">
        ${escapeHtml(SITE_NAME)}
      </a>

      <a class="home-link" href="${SITE_URL}/#성공사례">
        수행사건 전체 보기
      </a>
    </div>
  </header>

  <main>
    <article class="article">
      <header class="article-header">
        <p class="category">${escapeHtml(category)}</p>
        <h1>${escapeHtml(title)}</h1>
        ${resultMarkup}
      </header>

      <div class="article-body">
        ${imageMarkup}
        ${summaryMarkup}

        <p class="notice">
          사건 결과는 구체적인 사실관계와 법률적 쟁점에 따라
          달라질 수 있으며, 동일하거나 유사한 결과를 보장하지 않습니다.
        </p>

        <section class="cta">
          <strong>유사한 사건으로 상담이 필요하신가요?</strong>

          <p>
            안재현 변호사가 사건 내용을 직접 검토합니다.
          </p>

          <div class="cta-links">
            <a class="phone" href="tel:16885644">
              전화상담 ${escapeHtml(PHONE_NUMBER)}
            </a>

            <a
              class="consultation"
              href="${SITE_URL}/#consultation-form"
            >
              상담 신청하기
            </a>
          </div>
        </section>
      </div>
    </article>
  </main>

  <footer>
    © ${new Date().getFullYear()} ${escapeHtml(SITE_NAME)}.
    All rights reserved.
  </footer>
</body>
</html>
`;
};

const readPreviousManifest = async () => {
  try {
    const source = await fs.readFile(MANIFEST_PATH, 'utf8');
    const parsed = JSON.parse(source);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const removePreviouslyGeneratedPages = async (currentIdentifiers) => {
  const previousIdentifiers = await readPreviousManifest();
  const currentSet = new Set(currentIdentifiers);

  for (const identifier of previousIdentifiers) {
    if (
      typeof identifier !== 'string' ||
      identifier === '.' ||
      identifier === '..' ||
      identifier.includes('/') ||
      identifier.includes('\\')
    ) {
      continue;
    }

    if (currentSet.has(identifier)) {
      continue;
    }

    const oldDirectory = path.join(CASE_PAGE_ROOT, identifier);

    await fs.rm(oldDirectory, {
      recursive: true,
      force: true,
    });
  }
};

const generateCasePages = async (cases) => {
  await fs.mkdir(CASE_PAGE_ROOT, { recursive: true });

  const identifiers = cases.map(getCaseIdentifier);

  await removePreviouslyGeneratedPages(identifiers);

  for (const item of cases) {
    const identifier = getCaseIdentifier(item);
    const outputDirectory = path.join(CASE_PAGE_ROOT, identifier);
    const outputPath = path.join(outputDirectory, 'index.html');

    await fs.mkdir(outputDirectory, { recursive: true });
    await fs.writeFile(
      outputPath,
      buildCasePageHtml(item),
      'utf8',
    );
  }

  await fs.writeFile(
    MANIFEST_PATH,
    `${JSON.stringify(identifiers, null, 2)}\n`,
    'utf8',
  );
};

const generateSitemap = async (cases) => {
  const urls = [
    SITE_URL,
    ...cases.map(getCaseUrl),
  ];

  const urlMarkup = urls
    .map(
      (url) => `  <url>
    <loc>${escapeXml(url)}</loc>
  </url>`,
    )
    .join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlMarkup}
</urlset>
`;

  await fs.writeFile(SITEMAP_PATH, sitemap, 'utf8');
};

const run = async () => {
  console.log('성공사례 검색엔진 파일 생성을 시작합니다.');

  const cases = await readCases();

  if (cases.length === 0) {
    console.warn(
      '공개 상태인 성공사례가 없습니다. 홈페이지 정보만 생성합니다.',
    );
  }

  await generateCasePages(cases);
  await generateSitemap(cases);
  await updateIndexItemList(cases);

  console.log(`정적 성공사례 페이지: ${cases.length}개`);
  console.log('public/sitemap.xml 자동 갱신 완료');
  console.log('index.html ItemList 자동 갱신 완료');
  console.log('성공사례 검색엔진 파일 생성이 완료되었습니다.');
};

run().catch((error) => {
  console.error('');
  console.error('검색엔진 파일 생성 중 오류가 발생했습니다.');
  console.error(error);

  process.exitCode = 1;
});
