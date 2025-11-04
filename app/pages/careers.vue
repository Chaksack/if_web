<template>
  <div>
    <!-- Hero Section -->
    <div class="relative bg-primary/10">
      <div class="mx-auto max-w-7xl px-6 py-24">
        <div class="max-w-3xl">
          <h1 class="text-4xl font-bold tracking-tight mb-4">Join Our Team</h1>
          <p class="text-xl text-gray-600">Help us build the future of financial services in Africa. We're looking for talented individuals who are passionate about making a difference.</p>
        </div>
      </div>
    </div>

    <!-- Values Section -->
    <div class="py-16">
      <div class="mx-auto max-w-7xl px-6">
        <h2 class="text-3xl font-bold mb-12 text-center">Our Values</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Users class="w-6 h-6 text-primary" />
            </div>
            <h3 class="text-xl font-semibold mb-2">Customer First</h3>
            <p class="text-gray-600">We put our customers at the heart of everything we do, ensuring their success is our success.</p>
          </div>
          <div class="text-center">
            <div class="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Lightbulb class="w-6 h-6 text-primary" />
            </div>
            <h3 class="text-xl font-semibold mb-2">Innovation</h3>
            <p class="text-gray-600">We embrace new ideas and technologies to create better financial solutions for our customers.</p>
          </div>
          <div class="text-center">
            <div class="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Shield class="w-6 h-6 text-primary" />
            </div>
            <h3 class="text-xl font-semibold mb-2">Integrity</h3>
            <p class="text-gray-600">We maintain the highest standards of ethics and transparency in all our dealings.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Benefits Section -->
    <div class="bg-gray-50 py-16">
      <div class="mx-auto max-w-7xl px-6">
        <h2 class="text-3xl font-bold mb-12 text-center">Why Join Us</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="bg-white p-6 rounded-lg shadow-sm">
            <Heart class="w-8 h-8 text-primary mb-4" />
            <h3 class="text-lg font-semibold mb-2">Health & Wellness</h3>
            <ul class="space-y-2">
              <li class="flex items-center gap-2">
                <CheckCircle2 class="w-4 h-4 text-green-500" />
                <span>Comprehensive health insurance</span>
              </li>
              <li class="flex items-center gap-2">
                <CheckCircle2 class="w-4 h-4 text-green-500" />
                <span>Mental health support</span>
              </li>
              <li class="flex items-center gap-2">
                <CheckCircle2 class="w-4 h-4 text-green-500" />
                <span>Wellness programs</span>
              </li>
            </ul>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-sm">
            <GraduationCap class="w-8 h-8 text-primary mb-4" />
            <h3 class="text-lg font-semibold mb-2">Learning & Development</h3>
            <ul class="space-y-2">
              <li class="flex items-center gap-2">
                <CheckCircle2 class="w-4 h-4 text-green-500" />
                <span>Professional certifications</span>
              </li>
              <li class="flex items-center gap-2">
                <CheckCircle2 class="w-4 h-4 text-green-500" />
                <span>Learning stipend</span>
              </li>
              <li class="flex items-center gap-2">
                <CheckCircle2 class="w-4 h-4 text-green-500" />
                <span>Career development</span>
              </li>
            </ul>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-sm">
            <Calendar class="w-8 h-8 text-primary mb-4" />
            <h3 class="text-lg font-semibold mb-2">Work-Life Balance</h3>
            <ul class="space-y-2">
              <li class="flex items-center gap-2">
                <CheckCircle2 class="w-4 h-4 text-green-500" />
                <span>Flexible working hours</span>
              </li>
              <li class="flex items-center gap-2">
                <CheckCircle2 class="w-4 h-4 text-green-500" />
                <span>Remote work options</span>
              </li>
              <li class="flex items-center gap-2">
                <CheckCircle2 class="w-4 h-4 text-green-500" />
                <span>Paid time off</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Open Positions -->
    <div class="py-16">
      <div class="mx-auto max-w-7xl px-6">
        <h2 class="text-3xl font-bold mb-12">Open Positions</h2>
        <div class="space-y-6">
          <div v-for="(department, idx) in departments" :key="idx">
            <h3 class="text-xl font-semibold mb-4">{{ department.name }}</h3>
            <div class="space-y-4">
              <div v-for="(position, posIdx) in department.positions" :key="posIdx" 
                class="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div class="flex items-start justify-between">
                  <div>
                    <h4 class="font-semibold text-lg mb-1">{{ position.title }}</h4>
                    <div class="flex items-center gap-4 text-sm text-gray-600">
                      <span class="flex items-center gap-1">
                        <MapPin class="w-4 h-4" />
                        {{ position.location }}
                      </span>
                      <span class="flex items-center gap-1">
                        <Clock class="w-4 h-4" />
                        {{ position.type }}
                      </span>
                    </div>
                  </div>
                  <Button>Apply Now</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Button } from '~/components/ui/button'
import { 
  Users, 
  Lightbulb, 
  Shield, 
  Heart, 
  GraduationCap, 
  Calendar, 
  CheckCircle2,
  MapPin,
  Clock
} from 'lucide-vue-next'

const departments = [
  {
    name: 'Engineering',
    positions: [
      {
        title: 'Senior Backend Engineer',
        location: 'Accra, Ghana',
        type: 'Full-time'
      },
      {
        title: 'Frontend Developer',
        location: 'Accra, Ghana',
        type: 'Full-time'
      },
      {
        title: 'DevOps Engineer',
        location: 'Remote',
        type: 'Full-time'
      }
    ]
  },
  {
    name: 'Product & Design',
    positions: [
      {
        title: 'Product Manager',
        location: 'Accra, Ghana',
        type: 'Full-time'
      },
      {
        title: 'UI/UX Designer',
        location: 'Hybrid',
        type: 'Full-time'
      }
    ]
  },
  {
    name: 'Sales & Marketing',
    positions: [
      {
        title: 'Business Development Manager',
        location: 'Accra, Ghana',
        type: 'Full-time'
      },
      {
        title: 'Digital Marketing Specialist',
        location: 'Remote',
        type: 'Full-time'
      }
    ]
  }
]
</script>