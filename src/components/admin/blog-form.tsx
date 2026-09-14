"use client"

import { useActionState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import type { BlogPost } from "@/lib/types"
import type { BlogPostActionState } from "@/app/admin/blog/actions"

const initialState: BlogPostActionState = {}

export function BlogForm({
  post,
  action,
}: {
  post?: BlogPost
  action: (prevState: BlogPostActionState, formData: FormData) => Promise<BlogPostActionState>
}) {
  const [state, formAction, isPending] = useActionState(action, initialState)
  const fieldErrors = state.fieldErrors ?? {}

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      {post ? <input type="hidden" name="currentImageUrl" value={post.imageUrl} /> : null}

      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="title">Title</FieldLabel>
          <FieldContent>
            <Input id="title" name="title" defaultValue={post?.title} required />
            <FieldError errors={fieldErrors.title?.map((message) => ({ message }))} />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="slug">Slug</FieldLabel>
          <FieldContent>
            <Input id="slug" name="slug" defaultValue={post?.slug} required />
            <FieldError errors={fieldErrors.slug?.map((message) => ({ message }))} />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="excerpt">Excerpt</FieldLabel>
          <FieldContent>
            <Textarea
              id="excerpt"
              name="excerpt"
              rows={2}
              defaultValue={post?.excerpt}
              required
            />
            <FieldError errors={fieldErrors.excerpt?.map((message) => ({ message }))} />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="content">Content</FieldLabel>
          <FieldContent>
            <Textarea
              id="content"
              name="content"
              rows={10}
              defaultValue={post?.content}
              required
            />
            <FieldError errors={fieldErrors.content?.map((message) => ({ message }))} />
          </FieldContent>
        </Field>

        <Field orientation="responsive">
          <FieldLabel htmlFor="category">Category</FieldLabel>
          <FieldContent>
            <Input
              id="category"
              name="category"
              placeholder="Events Guide"
              defaultValue={post?.category}
              required
            />
            <FieldError errors={fieldErrors.category?.map((message) => ({ message }))} />
          </FieldContent>
        </Field>

        <Field orientation="responsive">
          <FieldLabel htmlFor="author">Author</FieldLabel>
          <FieldContent>
            <Input id="author" name="author" defaultValue={post?.author} required />
            <FieldError errors={fieldErrors.author?.map((message) => ({ message }))} />
          </FieldContent>
        </Field>

        <Field orientation="responsive">
          <FieldLabel htmlFor="publishedAt">Published date</FieldLabel>
          <FieldContent>
            <Input
              id="publishedAt"
              name="publishedAt"
              type="date"
              defaultValue={post?.publishedAt.slice(0, 10)}
              required
            />
            <FieldError errors={fieldErrors.publishedAt?.map((message) => ({ message }))} />
          </FieldContent>
        </Field>

        <Field orientation="horizontal">
          <input
            id="isFeatured"
            name="isFeatured"
            type="checkbox"
            defaultChecked={post?.isFeatured}
            className="size-4 rounded border-input"
          />
          <FieldLabel htmlFor="isFeatured" className="font-normal">
            Pin as featured post
          </FieldLabel>
        </Field>

        <Field orientation="horizontal">
          <input
            id="isPublished"
            name="isPublished"
            type="checkbox"
            defaultChecked={post?.isPublished ?? true}
            className="size-4 rounded border-input"
          />
          <FieldLabel htmlFor="isPublished" className="font-normal">
            Published (visible on the site)
          </FieldLabel>
        </Field>

        <Field orientation="responsive">
          <FieldLabel htmlFor="image">
            Cover image {post ? "(leave blank to keep current)" : ""}
          </FieldLabel>
          <FieldContent>
            {post ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.imageUrl}
                alt=""
                className="mb-2 h-20 w-32 rounded object-cover"
              />
            ) : null}
            <Input id="image" name="image" type="file" accept="image/*" required={!post} />
          </FieldContent>
        </Field>

        {state.error ? <FieldError>{state.error}</FieldError> : null}
      </FieldGroup>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving…" : post ? "Save changes" : "Create post"}
      </Button>
    </form>
  )
}
