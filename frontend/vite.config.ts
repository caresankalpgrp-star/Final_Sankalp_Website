import { defineConfig, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'

// Plugin: delete MP4 files from dist after build
function excludeMP4(): PluginOption {
  return {
    name: 'exclude-mp4',
    closeBundle() {
      const videoDir = path.resolve(__dirname, 'dist/videos');
      if (fs.existsSync(videoDir)) {
        fs.rmSync(videoDir, { recursive: true, force: true });
        console.log('Removed dist/videos (MP4 excluded from deploy)');
      }
    },
  };
}

export default defineConfig(async () => {
  const plugins: PluginOption[] = [react(), tailwindcss(), excludeMP4()];
  try {
    // @ts-ignore — optional Emergent dev-only plugin
    const m = await import('./.vite-source-tags.js');
    if (m && typeof m.sourceTags === 'function') plugins.push(m.sourceTags());
  } catch { /* ignore — file only exists in the Emergent preview */ }

  return {
    plugins,
    publicDir: 'public',
    server: {
      host: '0.0.0.0',
      port: 3000,
      strictPort: true,
      allowedHosts: true as const,
      hmr: {
        clientPort: 443,
        protocol: 'wss' as const,
      },
      proxy: {
        '/api': {
          target: 'http://localhost:8001',
          changeOrigin: true,
        },
      },
    },
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor':   ['react', 'react-dom', 'react-router-dom'],
            'motion-vendor':  ['framer-motion'],
            'icons-vendor':   ['lucide-react'],
            'supabase-vendor':['@supabase/supabase-js'],
            'admin-pages':    [
              './src/admin/AdminLayout',
              './src/admin/LoginPage',
              './src/admin/DashboardPage',
              './src/admin/LeadsAdmin',
              './src/admin/ProjectsAdmin',
              './src/admin/BlogAdmin',
              './src/admin/TestimonialsAdmin',
              './src/admin/CatalogAdmin',
              './src/admin/ServicesAdmin',
              './src/admin/ImageUpload',
            ],
            'location-data':  [
              './src/seo/locationData',
              './src/seo/locationDataExpanded',
              './src/seo/allLocations',
            ],
          },
        },
      },
    },
  };
});
