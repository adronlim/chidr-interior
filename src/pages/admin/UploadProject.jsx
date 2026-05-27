import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProjects } from '../../context/ProjectsContext'
import { categories } from '../../data/projects'

const catOptions = categories.filter((c) => c.value !== 'all')

const empty = {
  name: '',
  cat: 'living',
  area: '',
  year: String(new Date().getFullYear()),
  desc: '',
  status: 'published',
}

export default function UploadProject() {
  const { addProject } = useProjects()
  const navigate = useNavigate()
  const fileInput = useRef(null)

  const [form, setForm] = useState(empty)
  const [images, setImages] = useState([]) // { url, file }
  const [dragging, setDragging] = useState(false)

  const update = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const addFiles = (fileList) => {
    const next = Array.from(fileList)
      .filter((f) => f.type.startsWith('image/'))
      .map((file) => ({ url: URL.createObjectURL(file), file }))
    setImages((prev) => [...prev, ...next])
  }

  const removeImage = (idx) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[idx].url)
      return prev.filter((_, i) => i !== idx)
    })
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Phase 1: object-URL previews stand in for real uploads. Phase 2 uploads
    // to Cloudinary and stores the returned CDN URLs instead.
    const urls = images.map((i) => i.url)
    const catLabel = catOptions.find((c) => c.value === form.cat)?.label || form.cat
    const fallback =
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1400&q=80'

    addProject({
      ...form,
      catLabel,
      img: urls[0] || fallback,
      images: urls.length ? urls : [fallback],
    })
    navigate('/admin/projects')
  }

  const inputClass =
    'mt-1 w-full rounded-md border border-charcoal/20 bg-transparent px-3 py-2 text-charcoal outline-none transition-colors focus:border-gold dark:border-cream/20 dark:text-cream dark:focus:border-gold-light'

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl font-medium">Upload project</h1>
      <p className="mt-1 text-sm text-charcoal/60 dark:text-cream/60">
        Add a new project to your portfolio.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm text-charcoal/70 dark:text-cream/70">
            Project name
          </label>
          <input id="name" name="name" value={form.name} onChange={update} required className={inputClass} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="cat" className="block text-sm text-charcoal/70 dark:text-cream/70">
              Category
            </label>
            <select id="cat" name="cat" value={form.cat} onChange={update} className={inputClass}>
              {catOptions.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="area" className="block text-sm text-charcoal/70 dark:text-cream/70">
              Area
            </label>
            <input id="area" name="area" value={form.area} onChange={update} placeholder="1,200 sqft" className={inputClass} />
          </div>
          <div>
            <label htmlFor="year" className="block text-sm text-charcoal/70 dark:text-cream/70">
              Year
            </label>
            <input id="year" name="year" type="number" value={form.year} onChange={update} className={inputClass} />
          </div>
        </div>

        <div>
          <span className="block text-sm text-charcoal/70 dark:text-cream/70">Images</span>
          <div
            onDragOver={(e) => {
              e.preventDefault()
              setDragging(true)
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInput.current?.click()}
            className={`mt-1 cursor-pointer rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
              dragging
                ? 'border-gold bg-gold/5 dark:border-gold-light'
                : 'border-charcoal/20 hover:border-gold dark:border-cream/20 dark:hover:border-gold-light'
            }`}
          >
            <p className="text-sm text-charcoal/70 dark:text-cream/70">
              Drag &amp; drop images here, or{' '}
              <span className="text-gold dark:text-gold-light">browse</span>
            </p>
            <p className="mt-1 text-xs text-charcoal/40 dark:text-cream/40">
              The first image becomes the cover.
            </p>
            <input
              ref={fileInput}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => {
                addFiles(e.target.files)
                e.target.value = ''
              }}
            />
          </div>

          {images.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
              {images.map((img, i) => (
                <div key={img.url} className="group relative aspect-square overflow-hidden rounded-lg bg-stone dark:bg-charcoal-soft">
                  <img src={img.url} alt="" className="h-full w-full object-cover" />
                  {i === 0 && (
                    <span className="absolute left-1 top-1 rounded bg-gold px-1.5 py-0.5 text-[10px] font-medium text-white dark:bg-gold-light dark:text-charcoal">
                      Cover
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeImage(i)
                    }}
                    className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-charcoal/70 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
                    aria-label="Remove image"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="desc" className="block text-sm text-charcoal/70 dark:text-cream/70">
            Description
          </label>
          <textarea id="desc" name="desc" rows={4} value={form.desc} onChange={update} className={inputClass} />
        </div>

        <label className="flex items-center gap-3 text-sm text-charcoal/80 dark:text-cream/80">
          <input
            type="checkbox"
            checked={form.status === 'published'}
            onChange={(e) =>
              setForm((f) => ({ ...f, status: e.target.checked ? 'published' : 'draft' }))
            }
            className="h-4 w-4 accent-gold dark:accent-gold-light"
          />
          Publish immediately
        </label>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="rounded-md bg-gold px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-charcoal dark:bg-gold-light dark:text-charcoal dark:hover:bg-cream"
          >
            Save project
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/projects')}
            className="rounded-md border border-charcoal/20 px-6 py-3 text-sm text-charcoal transition-colors hover:bg-charcoal/5 dark:border-cream/20 dark:text-cream dark:hover:bg-cream/10"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
