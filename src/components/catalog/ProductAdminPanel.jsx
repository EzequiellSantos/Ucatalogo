import { useMemo, useRef, useState } from 'react';
import axios from 'axios';
import { ImagePlus, Link, LoaderCircle, Pencil, Plus, Save, Trash2, Upload, X } from 'lucide-react';
import { toast } from 'sonner';

const CLOUDINARY_CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_FOLDER = process.env.REACT_APP_CLOUDINARY_FOLDER;

const createEmptyForm = (defaultCategory) => ({
  name: '',
  category: defaultCategory ?? '',
  description: '',
  image: '',
  imageAlt: ''
});

const isValidImageFile = (file) => file && file.type.startsWith('image/');

const canUploadToCloudinary = Boolean(CLOUDINARY_CLOUD_NAME && CLOUDINARY_UPLOAD_PRESET);

const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  if (CLOUDINARY_FOLDER) {
    formData.append('folder', CLOUDINARY_FOLDER);
  }

  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    formData
  );

  return response.data.secure_url;
};

export const ProductAdminPanel = ({
  products,
  categories,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  isSavingProduct = false
}) => {
  const availableCategories = useMemo(
    () => categories.filter((category) => category !== 'Todos'),
    [categories]
  );
  const fileInputRef = useRef(null);
  const [editingId, setEditingId] = useState(null);
  const [imageMode, setImageMode] = useState('url');
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [formData, setFormData] = useState(createEmptyForm(availableCategories[0]));

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const resetForm = () => {
    setEditingId(null);
    setImageMode('url');
    setIsUploadingImage(false);
    setFormData(createEmptyForm(availableCategories[0]));

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setImageMode('url');
    setFormData({
      legacyId: product.legacyId,
      name: product.name,
      category: product.category,
      description: product.description,
      image: product.image,
      imageAlt: product.imageAlt
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleImageFileChange = async (event) => {
    const file = event.target.files?.[0];

    if (!isValidImageFile(file)) {
      toast.error('Selecione um arquivo de imagem valido');
      return;
    }

    if (!canUploadToCloudinary) {
      toast.error('Upload automatico não habilitado');
      return;
    }

    try {
      setIsUploadingImage(true);
      const uploadedUrl = await uploadImageToCloudinary(file);

      setFormData((current) => ({
        ...current,
        image: uploadedUrl,
        imageAlt: current.imageAlt || current.name || file.name.replace(/\.[^.]+$/, '')
      }));

      setImageMode('url');
      toast.success('Imagem enviada e URL preenchida automaticamente');
    } catch (error) {
      console.error('Erro ao enviar imagem para a nuvem:', error);
      toast.error('Nao foi possivel enviar a imagem para a nuvem');
    } finally {
      setIsUploadingImage(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleImageModeChange = (mode) => {
    setImageMode(mode);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      ...formData,
      legacyId: formData.legacyId || products.length + 1,
      name: formData.name.trim(),
      category: formData.category.trim(),
      description: formData.description.trim(),
      image: formData.image.trim(),
      imageAlt: formData.imageAlt.trim() || formData.name.trim()
    };

    if (!payload.name || !payload.category || !payload.description || !payload.image) {
      toast.error('Preencha nome, categoria, descricao e imagem antes de salvar');
      return;
    }

    let saved = false;

    if (editingId) {
      saved = await onUpdateProduct(editingId, payload);
    } else {
      saved = await onAddProduct(payload);
    }

    if (saved) {
      resetForm();
    }
  };

  const previewImage =
    formData.image || 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="space-y-6 px-4">
      <div className="rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {editingId ? 'Editar produto' : 'Adicionar produto'}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Cole uma URL manualmente ou envie uma imagem para a Cloudinary e use a URL retornada automaticamente.
            </p>
          </div>

          {editingId ? (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-full border border-gray-200 p-2 text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700"
              aria-label="Cancelar edicao"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-3 md:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-3">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nome do produto"
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500"
              />

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500"
              >
                {availableCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Descricao do produto"
                rows={4}
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500"
              />

              <input
                name="imageAlt"
                value={formData.imageAlt}
                onChange={handleChange}
                placeholder="Texto alternativo da imagem"
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500"
              />
            </div>

            <div className="rounded-3xl border border-dashed border-emerald-200 bg-emerald-50/50 p-4">
              <div className="mb-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => handleImageModeChange('url')}
                  className={`flex-1 rounded-2xl px-3 py-2 text-sm font-medium transition ${
                    imageMode === 'url'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="inline-flex items-center gap-2">
                    <Link className="h-4 w-4" />
                    URL
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleImageModeChange('upload')}
                  className={`flex-1 rounded-2xl px-3 py-2 text-sm font-medium transition ${
                    imageMode === 'upload'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="inline-flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Upload
                  </span>
                </button>
              </div>

              {imageMode === 'upload' ? (
                <label className="mb-3 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-emerald-300 bg-white px-4 py-6 text-center transition hover:border-emerald-400 hover:bg-emerald-50">
                  {isUploadingImage ? (
                    <LoaderCircle className="mb-2 h-6 w-6 animate-spin text-emerald-600" />
                  ) : (
                    <ImagePlus className="mb-2 h-6 w-6 text-emerald-600" />
                  )}

                  <span className="text-sm font-medium text-gray-800">
                    {isUploadingImage ? 'Enviando imagem para a Cloudinary...' : 'Escolher imagem do dispositivo'}
                  </span>
                  <span className="mt-1 text-xs text-gray-500">
                    A URL retornada pela API sera preenchida automaticamente no campo abaixo
                  </span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    disabled={isUploadingImage || isSavingProduct}
                    className="hidden"
                  />
                </label>
              ) : null}

              {!canUploadToCloudinary && imageMode === 'upload' ? (
                <div className="mb-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                 Ambiente de Upload de Fotos não Habilitado.
                </div>
              ) : null}

              <div className="mb-3 space-y-2">
                <label className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  URL da imagem
                </label>
                <input
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="A URL aparece aqui depois do upload"
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-500"
                />
              </div>

              <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
                <img
                  src={previewImage}
                  alt={formData.imageAlt || formData.name || 'Pre-visualizacao'}
                  className="h-48 w-full object-cover"
                />
              </div>

              <p className="mt-3 text-xs text-gray-500">
                Pre-visualizacao da imagem que sera salva no catalogo.
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isUploadingImage || isSavingProduct}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-300"
          >
            {isUploadingImage ? <LoaderCircle className="h-4 w-4 animate-spin" /> : editingId ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {isUploadingImage ? 'Enviando imagem...' : isSavingProduct ? 'Salvando produto...' : editingId ? 'Salvar alteracoes' : 'Adicionar produto'}
          </button>
        </form>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Produtos cadastrados</h3>
          <span className="text-sm text-gray-500">{products.length} itens</span>
        </div>

        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm"
          >
            <img
              src={product.image}
              alt={product.imageAlt}
              className="h-16 w-16 rounded-xl object-cover"
            />

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-gray-900">{product.name}</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-gray-400">
                {product.category}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleEdit(product)}
                disabled={isSavingProduct}
                className="rounded-full border border-gray-200 p-2 text-gray-600 transition-colors hover:bg-gray-50"
                aria-label={`Editar ${product.name}`}
              >
                <Pencil className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => onDeleteProduct(product.id)}
                disabled={isSavingProduct}
                className="rounded-full border border-red-200 p-2 text-red-600 transition-colors hover:bg-red-50"
                aria-label={`Remover ${product.name}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
