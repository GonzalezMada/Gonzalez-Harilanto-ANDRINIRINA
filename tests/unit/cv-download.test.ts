// @vitest-environment node
// AstroContainer performs pure SSR string rendering (via esbuild internally);
// esbuild breaks under jsdom's patched TextEncoder/Uint8Array globals, so
// this file runs in the plain Node environment instead of the project default.
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, it } from 'vitest';
import CvDownloadButton from '../../src/components/molecules/CvDownloadButton.astro';

describe('CvDownloadButton', () => {
  it('resolves the French CV PDF href for the fr locale', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(CvDownloadButton, { props: { locale: 'fr' } });
    expect(html).toContain('/cv/cv-fr.pdf');
    expect(html).not.toContain('/cv/cv-en.pdf');
  });

  it('resolves the English CV PDF href for the en locale', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(CvDownloadButton, { props: { locale: 'en' } });
    expect(html).toContain('/cv/cv-en.pdf');
    expect(html).not.toContain('/cv/cv-fr.pdf');
  });
});
