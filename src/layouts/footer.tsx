import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })


export default function Footer() {
  return (
    <div className="mt-20 pt-20 bg-slate-400	">
        <div className="flex-1 flex justify-end gap-2">
          <a href="#">
            Privacy Policy
          </a>
          <a href="#">
            Terms of Service
          </a>
          <a href="#">
            Careers
          </a>
          <a href="#">
            Copyright
          </a>

        </div>
    </div>
  )
}
